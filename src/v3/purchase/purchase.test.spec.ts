import { AccountsService } from '../accounts/accounts.service'
import { RecurlyAccount } from '../accounts/accounts.types'
import { RecurlyInvoiceCollection } from '../invoice/invoice.types'
import { PlanService } from '../plan/plan.service'
import { RecurlyPlan } from '../plan/plan.types'
import { canTest, suppressErrorTesting } from '../v3.helpers'
import { RecurlyV3Module } from '../v3.module'
import { RecurlyPurchaseCreateDto } from './purchase.dto'
import { PurchaseService } from './purchase.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

// Unique identifiers to avoid conflicts
const accountCode = `test-account-${Date.now()}`
const planCode = `test-plan-${Date.now()}`

describe('PurchaseService', () => {
	let service: PurchaseService
	let accountsService: AccountsService
	let planService: PlanService
	let testAccount: RecurlyAccount
	let testPlan: RecurlyPlan
	let createdPurchase: RecurlyInvoiceCollection

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<PurchaseService>(PurchaseService)
		accountsService = moduleRef.get<AccountsService>(AccountsService)
		planService = moduleRef.get<PlanService>(PlanService)

		// Create test account
		testAccount = await accountsService.createAccount({
			code: accountCode,
			email: `${accountCode}@test.com`,
			first_name: 'Test',
			last_name: 'Purchase',
			billing_info: {
				first_name: 'Test',
				last_name: 'Purchase',
				number: '4111111111111111',
				month: '12',
				year: '2030',
				cvv: '123',
				address: {
					street1: '123 Test St',
					city: 'San Francisco',
					region: 'CA',
					postal_code: '94110',
					country: 'US',
				},
			},
		})

		// Create test plan
		testPlan = await planService.createPlan({
			code: planCode,
			name: 'Test Purchase Plan',
			currencies: [
				{
					currency: 'USD',
					unit_amount: 10.0,
				},
			],
			interval_unit: 'months',
			interval_length: 1,
		})
	})

	describe('Purchase Operations', () => {
		// PREVIEW
		it.skip('should preview a purchase', async () => {
			const purchaseDto: RecurlyPurchaseCreateDto = {
				currency: 'USD',
				account: {
					code: accountCode,
				},
				subscriptions: [
					{
						plan_code: planCode,
					},
				],
			}

			const preview = await service.previewPurchase(purchaseDto)
			expect(preview).toBeDefined()
			expect(preview.charge_invoice).toBeDefined()
			expect(preview.charge_invoice?.state).toBe('draft')
			expect(preview.charge_invoice?.total).toBeGreaterThan(0)
		})

		// CREATE
		it('should create a purchase', async () => {
			const purchaseDto: RecurlyPurchaseCreateDto = {
				currency: 'USD',
				account: {
					code: accountCode,
				},
				subscriptions: [
					{
						plan_code: planCode,
						quantity: 1,
					},
				],
			}

			createdPurchase = await service.createPurchase(purchaseDto)
			expect(createdPurchase).toBeDefined()
			expect(createdPurchase.charge_invoice).toBeDefined()
			expect(createdPurchase.charge_invoice?.state).toBeTruthy()
			expect(createdPurchase.charge_invoice?.total).toBeGreaterThan(0)
			expect(createdPurchase.charge_invoice?.subscription_ids?.length).toBeGreaterThan(0)
		})

		// CREATE with line items
		it('should create a purchase with line items', async () => {
			const purchaseDto: RecurlyPurchaseCreateDto = {
				currency: 'USD',
				account: {
					code: accountCode,
				},
				line_items: [
					{
						currency: 'USD',
						unit_amount: 50.0,
						quantity: 1,
						description: 'One-time setup fee',
						type: 'charge',
					},
				],
			}

			const purchase = await service.createPurchase(purchaseDto)
			expect(purchase).toBeDefined()
			expect(purchase.charge_invoice).toBeDefined()
			expect(purchase.charge_invoice?.line_items?.length).toBeGreaterThan(0)
			expect(purchase.charge_invoice?.total).toBe(50.0)
		})

		// CREATE PENDING
		it.skip('should create a pending purchase', async () => {
			// Update account with email required for pending purchases
			await accountsService.updateAccount(testAccount.id!, {
				email: `${accountCode}@test.com`,
			})

			const purchaseDto: RecurlyPurchaseCreateDto = {
				currency: 'EUR',
				account: {
					billing_info: {
						first_name: 'Test',
						last_name: 'Purchase',
					},
				},
				line_items: [
					{
						currency: 'EUR',
						unit_amount: 25.0,
						quantity: 1,
						description: 'Test pending purchase',
						type: 'charge',
					},
				],
			}

			const pendingPurchase = await service.createPendingPurchase(purchaseDto)
			expect(pendingPurchase).toBeDefined()
			expect(pendingPurchase.charge_invoice).toBeDefined()
			expect(pendingPurchase.charge_invoice?.state).toBe('pending')
		})

		// AUTHORIZE
		it.skip('should authorize a purchase', async () => {
			const purchaseDto: RecurlyPurchaseCreateDto = {
				currency: 'USD',
				account: {
					code: accountCode,
				},
				line_items: [
					{
						currency: 'USD',
						unit_amount: 100.0,
						quantity: 1,
						description: 'Authorization test',
						type: 'charge',
					},
				],
			}

			const authorizedPurchase = await service.authorizePurchase(purchaseDto)
			expect(authorizedPurchase).toBeDefined()
			expect(authorizedPurchase.charge_invoice).toBeDefined()
			// The transaction should be in an authorized state
			const transaction = authorizedPurchase.charge_invoice?.transactions?.[0]
			expect(transaction).toBeDefined()
			expect(transaction?.type).toBe('authorization')
		})

		// Note: CAPTURE and CANCEL operations require a valid transaction ID from an authorized purchase
		// These would typically be tested in an integration environment with real payment processing

		// Error handling
		it('should handle invalid account code', async () => {
			const purchaseDto: RecurlyPurchaseCreateDto = {
				currency: 'USD',
				account: {
					code: 'invalid-account-code',
				},
				subscriptions: [
					{
						plan_code: planCode,
					},
				],
			}

			await suppressErrorTesting(
				service,
				(dto: RecurlyPurchaseCreateDto) => service.createPurchase(dto),
				purchaseDto,
			)
		})

		it('should handle invalid plan code', async () => {
			if (!canTest()) return

			const purchaseDto: RecurlyPurchaseCreateDto = {
				currency: 'USD',
				account: {
					code: accountCode,
				},
				subscriptions: [
					{
						plan_code: 'invalid-plan-code',
					},
				],
			}

			await suppressErrorTesting(
				service,
				(dto: RecurlyPurchaseCreateDto) => service.createPurchase(dto),
				purchaseDto,
			)
		})
	})

	afterAll(async () => {
		// Clean up test data
		try {
			// Remove the test plan
			if (testPlan?.id) {
				await suppressErrorTesting(planService, (id: string) => planService.removePlan(id), testPlan.id)
			}
			// Deactivate the test account
			if (testAccount?.id) {
				await suppressErrorTesting(
					accountsService,
					(id: string) => accountsService.deactivateAccount(id),
					testAccount.id,
				)
			}
		} catch (error) {
			// Ignore cleanup errors
			console.error('Cleanup error:', error)
		}
	})
})
