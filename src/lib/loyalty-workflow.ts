import { getSql } from "@/lib/db";

export async function requestRewardRedemption(input:{
  customerId:string;
  rewardId:string;
}){
  const sql=getSql();

  const rows=await sql`
    with account as (
      select la.*
      from loyalty_accounts la
      where la.customer_id=${input.customerId}
      for update
    ),
    reward as (
      select rc.*
      from reward_catalog rc
      where rc.id=${input.rewardId}
        and rc.is_active=true
        and (rc.valid_from is null or rc.valid_from<=now())
        and (rc.valid_until is null or rc.valid_until>=now())
      limit 1
    ),
    eligibility as (
      select
        account.id as loyalty_account_id,
        account.points_balance,
        reward.id as reward_id,
        reward.points_cost,
        reward.inventory_limit,
        (
          select count(*)::integer
          from reward_redemptions rr
          where rr.reward_id=reward.id
            and rr.status in ('requested','approved','used')
        ) as used_inventory
      from account cross join reward
      where account.points_balance>=reward.points_cost
        and (
          reward.inventory_limit is null
          or (
            select count(*)
            from reward_redemptions rr
            where rr.reward_id=reward.id
              and rr.status in ('requested','approved','used')
          )<reward.inventory_limit
        )
    ),
    redemption as (
      insert into reward_redemptions (
        loyalty_account_id,reward_id,points_spent,status
      )
      select loyalty_account_id,reward_id,points_cost,'requested'
      from eligibility
      returning id,loyalty_account_id,reward_id,points_spent
    ),
    balance as (
      update loyalty_accounts la
      set points_balance=la.points_balance-redemption.points_spent,updated_at=now()
      from redemption
      where la.id=redemption.loyalty_account_id
      returning la.id,la.points_balance
    ),
    ledger as (
      insert into loyalty_transactions (
        loyalty_account_id,transaction_type,points,source_type,source_id,description
      )
      select
        redemption.loyalty_account_id,
        'redeem',
        -redemption.points_spent,
        'reward_redemption',
        redemption.id,
        'Reward redemption requested'
      from redemption
      returning id
    )
    select
      redemption.id,
      redemption.points_spent,
      balance.points_balance
    from redemption join balance on balance.id=redemption.loyalty_account_id
  `;

  const row=rows[0];
  if(!row){
    throw new Error("Reward is unavailable, sold out, or the account does not have enough points.");
  }

  return {
    redemptionId:String(row.id),
    pointsSpent:Number(row.points_spent),
    remainingPoints:Number(row.points_balance)
  };
}

export async function reviewRewardRedemption(input:{
  redemptionId:string;
  decision:"approved"|"cancelled"|"used";
  actorId?:string|null;
}){
  const sql=getSql();

  if(input.decision==="approved"){
    const rows=await sql`
      update reward_redemptions
      set status='approved',approved_by=${input.actorId??null},approved_at=now()
      where id=${input.redemptionId} and status='requested'
      returning id
    `;
    if(!rows[0]) throw new Error("Redemption is no longer pending.");
    return {status:"approved" as const};
  }

  if(input.decision==="used"){
    const rows=await sql`
      update reward_redemptions
      set status='used',used_at=now()
      where id=${input.redemptionId} and status='approved'
      returning id
    `;
    if(!rows[0]) throw new Error("Only approved redemptions can be marked used.");
    return {status:"used" as const};
  }

  const rows=await sql`
    with target as (
      select rr.id,rr.loyalty_account_id,rr.points_spent,rr.status
      from reward_redemptions rr
      where rr.id=${input.redemptionId}
        and rr.status in ('requested','approved')
      for update
    ),
    cancelled as (
      update reward_redemptions rr
      set status='cancelled'
      from target
      where rr.id=target.id
      returning rr.id,target.loyalty_account_id,target.points_spent
    ),
    refunded as (
      update loyalty_accounts la
      set
        points_balance=la.points_balance+cancelled.points_spent,
        lifetime_points=la.lifetime_points,
        updated_at=now()
      from cancelled
      where la.id=cancelled.loyalty_account_id
      returning la.id,la.points_balance
    ),
    ledger as (
      insert into loyalty_transactions (
        loyalty_account_id,transaction_type,points,source_type,source_id,description,created_by
      )
      select
        cancelled.loyalty_account_id,
        'reversal',
        cancelled.points_spent,
        'reward_redemption',
        cancelled.id,
        'Reward redemption cancelled and points returned',
        ${input.actorId??null}
      from cancelled
      returning id
    )
    select cancelled.id,refunded.points_balance
    from cancelled join refunded on refunded.id=cancelled.loyalty_account_id
  `;

  if(!rows[0]) throw new Error("Redemption cannot be cancelled.");
  return {status:"cancelled" as const,pointsBalance:Number(rows[0].points_balance)};
}

export async function adjustCustomerPoints(input:{
  customerId:string;
  points:number;
  description:string;
  actorId?:string|null;
}){
  if(!Number.isInteger(input.points)||input.points===0){
    throw new Error("Points adjustment must be a non-zero integer.");
  }

  const sql=getSql();
  const rows=await sql`
    with account as (
      select *
      from loyalty_accounts
      where customer_id=${input.customerId}
      for update
    ),
    eligible as (
      select *
      from account
      where points_balance+${input.points}>=0
    ),
    updated as (
      update loyalty_accounts la
      set
        points_balance=la.points_balance+${input.points},
        lifetime_points=case when ${input.points}>0 then la.lifetime_points+${input.points} else la.lifetime_points end,
        updated_at=now()
      from eligible
      where la.id=eligible.id
      returning la.id,la.points_balance
    ),
    ledger as (
      insert into loyalty_transactions (
        loyalty_account_id,transaction_type,points,source_type,description,created_by
      )
      select
        updated.id,
        'adjust',
        ${input.points},
        'manual_adjustment',
        ${input.description},
        ${input.actorId??null}
      from updated
      returning id
    )
    select * from updated
  `;

  if(!rows[0]) throw new Error("Customer loyalty account is missing or the adjustment would make points negative.");
  return {pointsBalance:Number(rows[0].points_balance)};
}
