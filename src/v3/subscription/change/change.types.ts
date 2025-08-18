import { RecurlyPlanMini } from '../../plan/plan.types';
import { RecurlyCustomFields } from '../../v3.types';
import {
  RecurlySubscriptionAddOn,
  RecurlySubscriptionShipping,
} from '../subscription.types';

export type RecurlySubscriptionChangeBillingInfo = {
  three_d_secure_action_result_token_id: string;
};

export type RecurlySubscriptionRampIntervalResponse = {
  starting_billing_cycle: number;
  remaining_billing_cycles: number;
  starting_on: string;
  ending_on: string;
  unit_amount: number;
};

export type RecurlySubscriptionChange = {
  id: string;
  object: 'subscription_change';
  subscription_id: string;
  plan: RecurlyPlanMini;
  add_ons: RecurlySubscriptionAddOn[];
  unit_amount: number;
  tax_inclusive: boolean;
  quantity: number;
  shipping: RecurlySubscriptionShipping;
  activate_at: string;
  activated: boolean;
  revenue_schedule_type: 'at_range_end' | 'at_range_start' | 'evenly' | 'never';
  invoice_collection: any;
  business_entity: any;
  custom_fields: RecurlyCustomFields;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  billing_info: RecurlySubscriptionChangeBillingInfo;
  ramp_intervals: RecurlySubscriptionRampIntervalResponse[];
};
