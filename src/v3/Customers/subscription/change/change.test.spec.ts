import { PlanService } from '../../../ProductsPromotions/plan/plan.service'
import { RecurlyPlan } from '../../../ProductsPromotions/plan/plan.types'
import { canTest, suppressErrorTesting } from '../../../v3.helpers'
import { RecurlyV3Module } from '../../../v3.module'
import { AccountsService } from '../../accounts/accounts.service'
import { RecurlyAccount } from '../../accounts/accounts.types'
import { RecurlyUpdateBillingInfoDto } from '../../accounts/billing/info/info.dto'
import { BillingInfoService } from '../../accounts/billing/info/info.service'
import { SubscriptionService } from '../subscription.service'
import { RecurlySubscription } from '../subscription.types'
import { RecurlySubscriptionChange } from '../subscription.types'
import { ChangeService } from './change.service'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Subscription Change', () => {
	let changeService: ChangeService
	let subscriptionsService: SubscriptionService
	let accountsService: AccountsService
	let billingInfoService: BillingInfoService
	let planService: PlanService
	let testAccount: RecurlyAccount
	let testPlan: RecurlyPlan
	let testPlan2: RecurlyPlan
	let createdSubscription: RecurlySubscription
	let createdChange: RecurlySubscriptionChange

	beforeAll(async () => {
		if (!canTest()) {
			console.warn('Skipping Subscription Change tests due to configuration or environment issues.')
			return
		}

		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		changeService = moduleRef.get<ChangeService>(ChangeService)
		subscriptionsService = moduleRef.get<SubscriptionService>(SubscriptionService)
		accountsService = moduleRef.get<AccountsService>(AccountsService)
		billingInfoService = moduleRef.get<BillingInfoService>(BillingInfoService)
		planService = moduleRef.get<PlanService>(PlanService)

		// Create a test account
		testAccount = await accountsService.createAccount({
			code: faker.string.uuid(),
			email: faker.internet.email(),
			first_name: 'SubscriptionChange',
			last_name: 'Test Account',
		})

		// Add billing info to the account
		const billingInfo: RecurlyUpdateBillingInfoDto = {
			first_name: 'SubscriptionChange',
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

		// Create test plans
		testPlan = await planService.createPlan({
			code: faker.string.uuid(),
			name: 'Test Plan for Subscription Change',
			currencies: [{ currency: 'USD', unit_amount: 10.0 }],
		})

		testPlan2 = await planService.createPlan({
			code: faker.string.uuid(),
			name: 'Test Plan 2 for Subscription Change',
			currencies: [{ currency: 'USD', unit_amount: 20.0 }],
		})

		// Create a subscription based on the first plan
		createdSubscription = await subscriptionsService.createSubscription({
			plan_code: testPlan.code,
			currency: 'USD',
			account: {
				code: testAccount.code as string,
			},
		})
	})

	// Plan and create a subscription change to the second plan
	describe('Preview and Create', () => {
		it('should preview a subscription change', async () => {
			const preview = await changeService.previewSubscriptionChange(createdSubscription.id as string, {
				plan_code: testPlan2.code,
				timeframe: 'now',
			})
			expect(preview).toBeDefined()
			expect(preview.object).toBe('subscription_change')
			expect(preview.unit_amount).toBe(20.0)
		})

		it('should create a subscription change', async () => {
			createdChange = (await changeService.createSubscriptionChange(createdSubscription.id as string, {
				plan_code: testPlan2.code,
				timeframe: 'term_end',
			})) as RecurlySubscriptionChange
			expect(createdChange).toBeDefined()
			expect(createdChange.object).toBe('subscription_change')
			expect(createdChange.unit_amount).toBe(20.0)
		})
	})

	describe('Read and Delete', () => {
		it('should get a pending subscription change', async () => {
			const change = await changeService.getSubscriptionChange(createdSubscription.id as string)
			expect(change).toBeDefined()
			expect(change.id).toBe(createdChange.id)
		})

		it('should remove a pending subscription change', async () => {
			await changeService.removeSubscriptionChange(createdSubscription.id as string)
			// Verify that the change is gone by trying to get it again
			await suppressErrorTesting(
				changeService,
				(id: string) => changeService.getSubscriptionChange(id),
				createdChange.id,
			)
		})
	})

	afterAll(async () => {
		// Clean up test data
		try {
			if (createdSubscription?.id) {
				await subscriptionsService.terminateSubscription(createdSubscription.id, 'none')
			}
		} catch (error) {
			console.warn('Failed to clean up subscription:', error)
		}
		try {
			if (testPlan?.id) {
				await planService.removePlan(testPlan.id)
			}
		} catch (error) {
			console.warn('Failed to clean up plan 1:', error)
		}
		try {
			if (testPlan2?.id) {
				await planService.removePlan(testPlan2.id)
			}
		} catch (error) {
			console.warn('Failed to clean up plan 2:', error)
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
