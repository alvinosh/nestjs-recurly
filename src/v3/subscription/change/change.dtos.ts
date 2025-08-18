import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RecurlyCustomField } from '../../v3.types';
import {
  RecurlyShippingAddressCreate,
  RecurlySubscriptionAddOnUpdate,
  RecurlySubscriptionRampInterval,
} from '../subscription.dto';

class RecurlyProrationSettings {
  @IsEnum(['full_amount', 'prorated_amount', 'none'])
  @IsOptional()
  @Expose()
  charge: 'full_amount' | 'prorated_amount' | 'none';

  @IsEnum(['full_amount', 'prorated_amount', 'none'])
  @IsOptional()
  @Expose()
  credit: 'full_amount' | 'prorated_amount' | 'none';
}

class RecurlySubscriptionChangeBillingInfoCreate {
  @IsString()
  @IsOptional()
  @Expose()
  three_d_secure_action_result_token_id: string;
}

class RecurlySubscriptionChangeShippingCreate {
  @IsString()
  @IsOptional()
  @Expose()
  method_id: string;

  @IsString()
  @IsOptional()
  @Expose()
  method_code: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  amount: number;

  @IsString()
  @IsOptional()
  @Expose()
  address_id: string;

  @ValidateNested()
  @Type(() => RecurlyShippingAddressCreate)
  @IsOptional()
  @Expose()
  address: RecurlyShippingAddressCreate;
}

export class RecurlySubscriptionChangeCreate {
  @IsEnum(['bill_date', 'now', 'renewal', 'term_end'])
  @IsOptional()
  @Expose()
  timeframe: 'bill_date' | 'now' | 'renewal' | 'term_end';

  @IsString()
  @IsOptional()
  @Expose()
  plan_id: string;

  @IsString()
  @IsOptional()
  @Expose()
  plan_code: string;

  @IsString()
  @IsOptional()
  @Expose()
  business_entity_id: string;

  @IsString()
  @IsOptional()
  @Expose()
  business_entity_code: string;

  @IsString()
  @IsOptional()
  @Expose()
  price_segment_id: string;

  @IsNumber()
  @IsOptional()
  @Expose()
  unit_amount: number;

  @IsBoolean()
  @IsOptional()
  @Expose()
  tax_inclusive: boolean;

  @IsInt()
  @IsOptional()
  @Expose()
  quantity: number;

  @ValidateNested()
  @Type(() => RecurlySubscriptionChangeShippingCreate)
  @IsOptional()
  @Expose()
  shipping: RecurlySubscriptionChangeShippingCreate;

  @IsArray()
  @IsOptional()
  @Expose()
  coupon_codes: string[];

  @ValidateNested({ each: true })
  @Type(() => RecurlySubscriptionAddOnUpdate)
  @IsArray()
  @IsOptional()
  @Expose()
  add_ons: RecurlySubscriptionAddOnUpdate[];

  @IsEnum(['automatic', 'manual'])
  @IsOptional()
  @Expose()
  collection_method: 'automatic' | 'manual';

  @IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'])
  @IsOptional()
  @Expose()
  revenue_schedule_type: 'at_range_end' | 'at_range_start' | 'evenly' | 'never';

  @ValidateNested({ each: true })
  @Type(() => RecurlyCustomField)
  @IsArray()
  @IsOptional()
  @Expose()
  custom_fields: RecurlyCustomField[];

  @IsString()
  @IsOptional()
  @Expose()
  po_number: string;

  @IsInt()
  @IsOptional()
  @Expose()
  net_terms: number;

  @IsEnum(['net', 'eom'])
  @IsOptional()
  @Expose()
  net_terms_type: 'net' | 'eom';

  @IsEnum(['moto'])
  @IsOptional()
  @Expose()
  transaction_type: 'moto';

  @ValidateNested()
  @Type(() => RecurlySubscriptionChangeBillingInfoCreate)
  @IsOptional()
  @Expose()
  billing_info: RecurlySubscriptionChangeBillingInfoCreate;

  @ValidateNested({ each: true })
  @Type(() => RecurlySubscriptionRampInterval)
  @IsArray()
  @IsOptional()
  @Expose()
  ramp_intervals: RecurlySubscriptionRampInterval[];

  @ValidateNested()
  @Type(() => RecurlyProrationSettings)
  @IsOptional()
  @Expose()
  proration_settings: RecurlyProrationSettings;
}
