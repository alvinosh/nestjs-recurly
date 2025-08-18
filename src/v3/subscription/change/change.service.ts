import { Injectable, Logger } from '@nestjs/common';
import { RecurlyConfigDto } from '../../../config/config.dto';
import { InjectConfig } from '../../../config/config.provider';
import { RECURLY_API_BASE_URL } from '../../v3.constants';
import { checkResponseIsOk, getHeaders } from '../../v3.helpers';
import { RecurlySubscriptionChangeCreate } from './change.dtos';
import { RecurlySubscriptionChange } from './change.types';

@Injectable()
export class ChangeService {
  private readonly logger = new Logger(ChangeService.name);

  constructor(
    @InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto,
  ) {}

  /**
   * Fetch a subscription's pending change
   * @param subscriptionId - Subscription ID or UUID.
   * @param apiKey - Optional API key to use for this request.
   * @returns A subscription's pending change.
   */
  async getSubscriptionChange(
    subscriptionId: string,
    apiKey?: string,
  ): Promise<RecurlySubscriptionChange> {
    const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/change`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(this.config, apiKey),
    });

    await checkResponseIsOk(response, this.logger, 'Get Subscription Change');
    return (await response.json()) as RecurlySubscriptionChange;
  }

  /**
   * Create a new subscription change
   * @param subscriptionId - Subscription ID or UUID.
   * @param body - The request body.
   * @param apiKey - Optional API key to use for this request.
   * @returns A subscription change.
   */
  async createSubscriptionChange(
    subscriptionId: string,
    body: RecurlySubscriptionChangeCreate,
    apiKey?: string,
  ): Promise<RecurlySubscriptionChange | void> {
    const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/change`;

    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(this.config, apiKey),
      body: JSON.stringify(body),
    });

    await checkResponseIsOk(response, this.logger, 'Create Subscription Change');

    if (response.status === 204) {
      return;
    }

    return (await response.json()) as RecurlySubscriptionChange;
  }

  /**
   * Delete the pending subscription change
   * @param subscriptionId - Subscription ID or UUID.
   * @param apiKey - Optional API key to use for this request.
   */
  async removeSubscriptionChange(
    subscriptionId: string,
    apiKey?: string,
  ): Promise<void> {
    const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/change`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: getHeaders(this.config, apiKey),
    });

    await checkResponseIsOk(response, this.logger, 'Remove Subscription Change');
  }

  /**
   * Preview a new subscription change
   * @param subscriptionId - Subscription ID or UUID.
   * @param body - The request body.
   * @param apiKey - Optional API key to use for this request.
   * @returns A subscription change.
   */
  async previewSubscriptionChange(
    subscriptionId: string,
    body: RecurlySubscriptionChangeCreate,
    apiKey?: string,
  ): Promise<RecurlySubscriptionChange> {
    const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/change/preview`;

    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(this.config, apiKey),
      body: JSON.stringify(body),
    });

    await checkResponseIsOk(response, this.logger, 'Preview Subscription Change');
    return (await response.json()) as RecurlySubscriptionChange;
  }
}
