-- ORYX loyalty/rewards integrity guards
-- Prevent negative balances, malformed ledger entries, overspending and invalid redemption state.

alter table loyalty_accounts
  add constraint loyalty_accounts_points_nonnegative
    check (points_balance >= 0),
  add constraint loyalty_accounts_lifetime_nonnegative
    check (lifetime_points >= 0),
  add constraint loyalty_accounts_balance_within_lifetime
    check (points_balance <= lifetime_points);

alter table loyalty_transactions
  add constraint loyalty_transactions_points_nonzero
    check (points <> 0),
  add constraint loyalty_transactions_sign_matches_type
    check (
      (transaction_type in ('earn','bonus') and points > 0)
      or (transaction_type in ('redeem','expire') and points < 0)
      or (transaction_type in ('adjust','reversal'))
    );

alter table reward_redemptions
  add constraint reward_redemptions_points_positive
    check (points_spent > 0),
  add constraint reward_redemptions_approval_consistent
    check (
      status = 'requested'
      or (status in ('approved','used') and approved_at is not null)
      or status in ('expired','cancelled')
    ),
  add constraint reward_redemptions_used_consistent
    check (status <> 'used' or used_at is not null);

alter table referrals
  add constraint referrals_points_nonnegative
    check (referrer_points_awarded >= 0 and referred_points_awarded >= 0),
  add constraint referrals_subject_present
    check (referred_customer_id is not null or referred_lead_id is not null),
  add constraint referrals_conversion_consistent
    check (status not in ('converted','rewarded') or converted_at is not null),
  add constraint referrals_reward_consistent
    check (status <> 'rewarded' or qualifying_order_id is not null);

alter table coupons
  add constraint coupons_discount_nonnegative
    check (discount_value is null or discount_value >= 0),
  add constraint coupons_percent_range
    check (discount_type <> 'percent' or (discount_value is not null and discount_value > 0 and discount_value <= 100)),
  add constraint coupons_limits_positive
    check (
      (usage_limit is null or usage_limit > 0)
      and (per_customer_limit is null or per_customer_limit > 0)
      and (min_order_value is null or min_order_value >= 0)
      and (max_discount is null or max_discount >= 0)
    ),
  add constraint coupons_valid_window
    check (valid_from is null or valid_until is null or valid_until > valid_from);

alter table coupon_redemptions
  add constraint coupon_redemptions_discount_nonnegative
    check (discount_amount >= 0);

-- One logical reward redemption per reward/order/account. NULL orders are intentionally
-- excluded because catalogue rewards may be requested before attaching them to an order.
create unique index if not exists uq_reward_redemption_order
  on reward_redemptions(loyalty_account_id,reward_id,order_id)
  where order_id is not null and status <> 'cancelled';

-- Prevent duplicate referral subjects for a code while preserving lead-to-customer conversion history.
create unique index if not exists uq_referral_code_customer
  on referrals(referral_code_id,referred_customer_id)
  where referred_customer_id is not null and status <> 'rejected';

create unique index if not exists uq_referral_code_lead
  on referrals(referral_code_id,referred_lead_id)
  where referred_lead_id is not null and status <> 'rejected';
