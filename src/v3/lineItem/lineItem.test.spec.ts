import { RecurlyCreateAccountDto } from '../accounts/accounts.dto'
import { AccountsService } from '../accounts/accounts.service'
import { RecurlyAccount } from '../accounts/accounts.types'
import { InvoiceService } from '../invoice/invoice.service'
import { RecurlyCreatePlanDto } from '../plan/plan.dto'
import { PlanService } from '../plan/plan.service'
import { RecurlySubscriptionCreateDto } from '../subscription/subscription.dto'
import { SubscriptionService } from '../subscription/subscription.service'
import { suppressErrorTesting } from '../v3.helpers'
import { RecurlyV3Module } from '../v3.module'
import { RecurlyCreateLineItemDto } from './lineItem.dtos'
import { LineItemService } from './lineItem.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('LineItemService', () => {
	let service: LineItemService
	let testAccount: RecurlyAccount
	let accountsService: AccountsService
	let planService: PlanService
	let subscriptionService: SubscriptionService
	let invoiceService: InvoiceService
	let createdLineItemId: string
	let testPlanId: string
	let testSubscriptionId: string
	let testInvoiceId: string
	const timestamp = Date.now()

	beforeAll(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()
		service = moduleRef.get<LineItemService>(LineItemService)
		accountsService = moduleRef.get(AccountsService)
		planService = moduleRef.get(PlanService)
		subscriptionService = moduleRef.get(SubscriptionService)
		invoiceService = moduleRef.get(InvoiceService)

		// Create test account
		const accountData: RecurlyCreateAccountDto = {
			code: `test-lineitem-account-${timestamp}`,
			email: `test-lineitem-${timestamp}@example.com`,
			first_name: 'LineItem',
			last_name: 'Test',
			billing_info: {
				first_name: 'LineItem',
				last_name: 'Test',
				number: '4111111111111111',
				month: '12',
				year: '2030',
				cvv: '123',
				address: {
					street1: '123 Test St',
					city: 'Testville',
					region: 'CA',
					postal_code: '12345',
					country: 'US',
				},
			},
		}
		testAccount = await accountsService.createAccount(accountData)

		// Create test plan for subscription
		const planData: RecurlyCreatePlanDto = {
			code: `test-lineitem-plan-${timestamp}`,
			name: 'Test LineItem Plan',
			interval_unit: 'months',
			interval_length: 1,
			currencies: [
				{
					currency: 'USD',
					unit_amount: 10.0,
				},
			],
		}
		const testPlan = await planService.createPlan(planData)
		testPlanId = testPlan.id!

		// Create test subscription
		const subscriptionData: RecurlySubscriptionCreateDto = {
			plan_code: testPlan.code,
			currency: 'USD',
			account: {
				code: testAccount.code!,
			},
		}
		const testSubscription = await subscriptionService.createSubscription(subscriptionData)
		testSubscriptionId = testSubscription.id!

		// Get first invoice for testing
		const invoices = await invoiceService.listAccountInvoices(testAccount.id!, { limit: 1 })
		if (invoices.data.length > 0) {
			testInvoiceId = invoices.data[0].id!
		}
	})

	it('should create a line item', async () => {
		const dto: RecurlyCreateLineItemDto = {
			currency: 'USD',
			unit_amount: 10.0,
			type: 'charge',
			description: 'Test Line Item',
		}
		const result = await service.createLineItem(testAccount.id!, dto)
		expect(result).toHaveProperty('id')
		expect(result.description).toBe('Test Line Item')
		expect(result.unit_amount).toBe(10.0)
		createdLineItemId = result.id!
	})

	it('should list all site line items', async () => {
		const result = await service.listLineItems({ limit: 10 })
		expect(Array.isArray(result.data)).toBe(true)
		expect(result).toHaveProperty('object', 'list')
	})

	it('should list account line items', async () => {
		const result = await service.listAccountLineItems(testAccount.id!, { limit: 10 })
		expect(Array.isArray(result.data)).toBe(true)
		expect(result.data.length).toBeGreaterThan(0)
		// Should include our created line item
		const ourLineItem = result.data.find(item => item.id === createdLineItemId)
		expect(ourLineItem).toBeDefined()
	})

	it('should get a line item by ID', async () => {
		const result = await service.getLineItem(createdLineItemId)
		expect(result).toHaveProperty('id', createdLineItemId)
		expect(result.description).toBe('Test Line Item')
	})

	it('should list invoice line items (if invoiceId is set)', async () => {
		if (testInvoiceId) {
			const result = await service.listInvoiceLineItems(testInvoiceId, { limit: 10 })
			expect(Array.isArray(result.data)).toBe(true)
		} else {
			console.log('Skipping invoice line items test - no invoice created')
		}
	})

	it('should list subscription line items (if subscriptionId is set)', async () => {
		if (testSubscriptionId) {
			const result = await service.listSubscriptionLineItems(testSubscriptionId, { limit: 10 })
			expect(Array.isArray(result.data)).toBe(true)
			// Subscription should have line items from the plan
			expect(result.data.length).toBeGreaterThan(0)
		} else {
			console.log('Skipping subscription line items test - no subscription created')
		}
	})

	it('should delete a line item', async () => {
		// Only pending line items can be deleted
		if (createdLineItemId) {
			await expect(service.removeLineItem(createdLineItemId)).resolves.toBeUndefined()

			await suppressErrorTesting(service, (id: string) => service.getLineItem(id), createdLineItemId)
		}
	})

	afterAll(async () => {
		try {
			// Clean up plan
			if (testPlanId) {
				await suppressErrorTesting(planService, (id: string) => planService.removePlan(id), testPlanId)
			}

			// Clean up account (this will also clean up subscriptions and invoices)
			if (testAccount && testAccount.id) {
				await suppressErrorTesting(
					accountsService,
					(id: string) => accountsService.deactivateAccount(id),
					testAccount.id,
				)
			}
		} catch (error) {
			console.log('Error during cleanup:', error)
		}
	})
})
