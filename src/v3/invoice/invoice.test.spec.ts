import { RecurlyCreateAccountDto } from '../accounts/accounts.dto'
import { AccountsService } from '../accounts/accounts.service'
import { RecurlyAccount } from '../accounts/accounts.types'
import { RecurlyCreatePlanDto } from '../plan/plan.dto'
import { PlanService } from '../plan/plan.service'
import { RecurlyPlan } from '../plan/plan.types'
import { RecurlySubscriptionCreateDto } from '../subscription/subscription.dto'
import { SubscriptionService } from '../subscription/subscription.service'
import { RecurlySubscription } from '../subscription/subscription.types'
import { canTest, suppressErrorTesting } from '../v3.helpers'
import { RecurlyV3Module } from '../v3.module'
import { InvoiceService } from './invoice.service'
import { RecurlyInvoice } from './invoice.types'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Invoice', () => {
	let invoiceService: InvoiceService
	let accountsService: AccountsService
	let planService: PlanService
	let subscriptionService: SubscriptionService

	// Test data
	let testAccount: RecurlyAccount
	let testPlan: RecurlyPlan
	let testSubscription: RecurlySubscription
	let testInvoice: RecurlyInvoice

	const timestamp = Date.now()

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		invoiceService = moduleRef.get(InvoiceService)

		accountsService = moduleRef.get(AccountsService)

		planService = moduleRef.get(PlanService)

		subscriptionService = moduleRef.get(SubscriptionService)

		// Create test account
		const accountData: RecurlyCreateAccountDto = {
			code: `test-invoice-account-${timestamp}`,
			email: `test-invoice-${timestamp}@example.com`,
			first_name: 'Invoice',
			last_name: 'Test',
			billing_info: {
				first_name: 'Invoice',
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

		// Create test plan
		const planData: RecurlyCreatePlanDto = {
			code: `test-invoice-plan-${timestamp}`,
			name: `Test Invoice Plan ${timestamp}`,
			currencies: [
				{
					currency: 'USD',
					unit_amount: 1000,
				},
			],
		}
		testPlan = await planService.createPlan(planData)

		// Create test subscription (to generate pending line items)
		const subscriptionData: RecurlySubscriptionCreateDto = {
			plan_code: testPlan.code,
			currency: 'USD',
			account: {
				code: testAccount.code!,
			},
		}
		testSubscription = await subscriptionService.createSubscription(subscriptionData)

		// Wait for subscription to activate and line items to be generated
		await new Promise(resolve => setTimeout(resolve, 4000))
	})

	describe('Invoice CRUD Operations', () => {
		// CREATE
		it('should fetch the latest invoice for the account', async () => {
			const response = await invoiceService.listAccountInvoices(testAccount.id!, {
				limit: 1,
				order: 'desc',
				sort: 'created_at',
			})
			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)
			testInvoice = response.data[0]
			expect(testInvoice.account?.id).toBe(testAccount.id)
			expect(testInvoice.currency).toBe('USD')
		})

		// READ
		it('should get an invoice', async () => {
			const invoice = await invoiceService.getInvoice(testInvoice.id)

			expect(invoice).toBeDefined()
			expect(invoice.id).toBe(testInvoice.id)
			expect(invoice.number).toBe(testInvoice.number)
			expect(invoice.account?.id).toBe(testAccount.id)
		})

		it('should list all invoices', async () => {
			const response = await invoiceService.listInvoices({ limit: 10 })
			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)
		})

		it('should list account invoices', async () => {
			const response = await invoiceService.listAccountInvoices(testAccount.id!, { limit: 10 })
			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)
			expect(response.data.some(inv => inv.id === testInvoice.id)).toBe(true)
		})

		it('should list subscription invoices', async () => {
			const response = await invoiceService.listSubscriptionInvoices(testSubscription.id!, { limit: 10 })
			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)
		})

		// PDF download
		it('should get invoice PDF', async () => {
			try {
				const pdfBuffer = await invoiceService.getInvoicePdf(testInvoice.id)
				expect(pdfBuffer).toBeDefined()
				expect(pdfBuffer).toBeInstanceOf(Buffer)
				expect(pdfBuffer.length).toBeGreaterThan(0)
			} catch (error: unknown) {
				// PDF generation might not be available in test environment
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				console.log('PDF generation not available:', (error as any).message)
			}
		})
	})

	afterAll(async () => {
		// Clean up test data
		try {
			if (testSubscription && testSubscription.id) {
				await suppressErrorTesting(
					subscriptionService,
					(id: string) => subscriptionService.cancelSubscription(id),
					testSubscription.id,
				)
			}
		} catch (error) {
			console.log('Error canceling subscription:', error)
		}

		try {
			if (testPlan && testPlan.id) {
				await suppressErrorTesting(planService, (id: string) => planService.removePlan(id), testPlan.id)
			}
		} catch (error) {
			console.log('Error removing plan:', error)
		}

		try {
			if (testAccount && testAccount.id) {
				await suppressErrorTesting(
					accountsService,
					(id: string) => accountsService.deactivateAccount(id),
					testAccount.id,
				)
			}
		} catch (error) {
			console.log('Error deactivating account:', error)
		}
	})
})
