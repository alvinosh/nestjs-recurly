import { AccountsService } from '../accounts/accounts.service'
import { RecurlyAccount } from '../accounts/accounts.types'
import { RecurlyUpdateBillingInfoDto } from '../accounts/billing/info/info.dto'
import { BillingInfoService } from '../accounts/billing/info/info.service'
import { PlanService } from '../plan/plan.service'
import { RecurlyPlan } from '../plan/plan.types'
import { canTest } from '../v3.helpers'
import { RecurlyV3Module } from '../v3.module'
import { SubscriptionService } from './subscription.service'
import { RecurlySubscription, RecurlySubscriptionList } from './subscription.types'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Subscriptions', () => {
	let subscriptionsService: SubscriptionService
	let accountsService: AccountsService
	let billingInfoService: BillingInfoService
	let planService: PlanService
	let testAccount: RecurlyAccount
	let testPlan: RecurlyPlan
	let createdSubscription: RecurlySubscription

	beforeAll(async () => {
		if (!canTest()) {
			console.warn('Skipping Subscriptions tests due to configuration or environment issues.')
			return
		}

		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		subscriptionsService = moduleRef.get<SubscriptionService>(SubscriptionService)
		accountsService = moduleRef.get<AccountsService>(AccountsService)
		billingInfoService = moduleRef.get<BillingInfoService>(BillingInfoService)
		planService = moduleRef.get<PlanService>(PlanService)

		// Create a test account to work with
		testAccount = await accountsService.createAccount({
			code: faker.string.alpha(49),
			email: faker.internet.email(),
			first_name: 'Subscription',
			last_name: 'Test Account',
		})

		// Add billing info to the account
		const billingInfo: RecurlyUpdateBillingInfoDto = {
			first_name: 'Subscription',
			last_name: 'Test Account',
			number: '4111111111111111',
			month: '12',
			year: '2030',
			cvv: '123',
			address: {
				street1: '123 Test Street',
				city: 'Test City',
				region: 'CA',
				postal_code: '12345',
				country: 'US',
			},
		}
		await billingInfoService.updateBillingInfo(testAccount.id as string, billingInfo)

		// Create a test plan to work with
		testPlan = await planService.createPlan({
			code: faker.string.alpha(20),
			name: 'Test Subscription Plan',
			currencies: [
				{
					currency: 'USD',
					unit_amount: 10.0,
				},
			],
		})
	})

	// CREATE Operations
	describe('Create Operations', () => {
		it('Create subscription', async () => {
			const subscriptionData = {
				plan_code: testPlan.code,
				currency: 'USD',
				account: {
					code: testAccount.code as string,
				},
			}

			createdSubscription = await subscriptionsService.createSubscription(subscriptionData)

			expect(createdSubscription).toBeDefined()
			expect(createdSubscription.object).toBe('subscription')
			expect(createdSubscription.state).toBe('active')
			expect(createdSubscription.plan?.code).toBe(testPlan.code)
			expect(createdSubscription.currency).toBe('USD')
		})
	})

	// READ Operations
	describe('Read Operations', () => {
		it('List all subscriptions', async () => {
			const result: RecurlySubscriptionList = await subscriptionsService.listSubscriptions({
				limit: 20,
			})

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
		})

		it("List account's subscriptions", async () => {
			const result: RecurlySubscriptionList = await subscriptionsService.listAccountSubscriptions(
				testAccount.id as string,
			)

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data?.length).toBeGreaterThan(0)

			// Verify our created subscription is in the list
			const foundSubscription = result.data?.find(sub => sub.id === createdSubscription.id)
			expect(foundSubscription).toBeDefined()
		})

		it('Get subscription by ID', async () => {
			const subscription = await subscriptionsService.getSubscription(createdSubscription.id as string)

			expect(subscription).toBeDefined()
			expect(subscription.id).toBe(createdSubscription.id)
			expect(subscription.object).toBe('subscription')
			expect(subscription.state).toBe('active')
		})

		it('Preview subscription renewal', async () => {
			const preview = await subscriptionsService.previewSubscriptionRenewal(createdSubscription.id as string)

			expect(preview).toBeDefined()
			expect(preview.object).toBe('invoice_collection')
		})
	})

	// UPDATE Operations
	describe('Update Operations', () => {
		it('Update subscription', async () => {
			const updateData = {
				customer_notes: 'Updated customer notes',
				po_number: 'PO-12345',
			}

			const updated = await subscriptionsService.updateSubscription(createdSubscription.id as string, updateData)

			expect(updated).toBeDefined()
			expect(updated.customer_notes).toBe('Updated customer notes')
			expect(updated.po_number).toBe('PO-12345')
		})

		it('Pause subscription', async () => {
			const paused = await subscriptionsService.pauseSubscription(createdSubscription.id as string, {
				remaining_pause_cycles: 1,
			})

			expect(paused).toBeDefined()
			//expect(paused.state).toBe('paused') // The pause state takes effect after the next billing cycle
			expect(paused.remaining_pause_cycles).toBe(1)
		})

		// it('Resume paused subscription', async () => {
		// 	const resumed = await subscriptionsService.resumeSubscription(createdSubscription.id as string)

		// 	expect(resumed).toBeDefined()
		// 	expect(resumed.state).toBe('active')
		// 	expect(resumed.paused_at).toBeNull()
		// })
	})

	// DELETE Operations
	describe('Delete Operations', () => {
		it('Cancel subscription at end of term', async () => {
			const canceled = await subscriptionsService.cancelSubscription(createdSubscription.id as string, {
				timeframe: 'term_end',
			})

			expect(canceled).toBeDefined()
			expect(canceled.state).toBe('canceled') // Still active until end of term
			expect(canceled.canceled_at).toBeDefined()
		})

		it('Reactivate canceled subscription', async () => {
			const reactivated = await subscriptionsService.reactivateSubscription(createdSubscription.id as string)

			expect(reactivated).toBeDefined()
			expect(reactivated.state).toBe('active')
			expect(reactivated.canceled_at).toBeNull()
		})

		it.skip('Terminate subscription with partial refund', async () => {
			// Create a new subscription to terminate
			const subscriptionToTerminate = await subscriptionsService.createSubscription({
				plan_code: testPlan.code,
				currency: 'USD',
				account: {
					code: testAccount.code as string,
				},
			})

			const terminated = await subscriptionsService.terminateSubscription(
				subscriptionToTerminate.id as string,
				'partial',
				true,
			)

			expect(terminated).toBeDefined()
			expect(terminated.state).toBe('expired')
		})

		it('Cancel subscription immediately', async () => {
			const canceled = await subscriptionsService.cancelSubscription(createdSubscription.id as string, {
				timeframe: 'bill_date',
			})

			expect(canceled).toBeDefined()
			expect(canceled.state).toBe('canceled')
		})
	})

	afterAll(async () => {
		// Clean up test data
		try {
			if (createdSubscription?.id) {
				await subscriptionsService.cancelSubscription(createdSubscription.id, { timeframe: 'bill_date' })
			}
		} catch (error) {
			console.warn('Failed to clean up subscription:', error)
		}

		try {
			if (testPlan?.id) {
				await planService.removePlan(testPlan.id)
			}
		} catch (error) {
			console.warn('Failed to clean up plan:', error)
		}

		try {
			if (testAccount?.id) {
				await accountsService.deactivateAccount(testAccount.id)
			}
		} catch (error) {
			console.warn('Failed to clean up account:', error)
		}
	})
})
