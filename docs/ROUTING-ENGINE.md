# ORYX Production Routing Engine

The platform must never route work merely because a partner pays a higher membership fee.

## Eligibility gate

A partner is considered only when:

- partner status is active;
- the exact service capability is active;
- partner price/terms are still valid;
- minimum quantity and capacity constraints are compatible with the order;
- required city/installation/technology constraints are met.

## Ranking dimensions

The initial scoring model is intentionally explainable:

- 30% execution cost to ORYX
- 30% historical quality/performance
- 20% normal lead time
- 10% declared capacity
- 10% current workload

The system returns a ranked recommendation. A production/procurement manager approves the assignment in the first operating phase.

## Future signals

- reprint/rework rate
- on-time percentage
- complaint rate
- material-specific quality
- urgent-job reliability
- distance/logistics cost
- partner settlement health
- customer-specific restrictions

Every assignment remains auditable: candidate set, score inputs, selected partner, selecting user, and override reason.
