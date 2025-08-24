import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { CreditPaymentService } from './creditPayment.service'
import { RecurlyCreditPayment, RecurlyCreditPaymentListResponse } from './creditPayment.types'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('CreditPaymentService', () => {
	let service: CreditPaymentService
	let sampleCreditPayment: RecurlyCreditPayment | null = null

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<CreditPaymentService>(CreditPaymentService)
	})

	describe('Credit Payment Read Operations', () => {
		// READ - List all credit payments
		it('should list credit payments', async () => {
			if (!canTest()) return

			const response: RecurlyCreditPaymentListResponse = await service.listCreditPayments({
				limit: 10,
				order: 'desc',
				sort: 'created_at',
			})

			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)

			// Store a sample credit payment for further testing if available
			if (response.data && response.data.length > 0) {
				sampleCreditPayment = response.data[0]

				// Validate credit payment structure
				expect(sampleCreditPayment.id).toBeDefined()
				expect(sampleCreditPayment.object).toBe('credit_payment')
				expect(sampleCreditPayment.uuid).toBeDefined()
				expect(sampleCreditPayment.currency).toBeDefined()
				expect(sampleCreditPayment.amount).toBeDefined()
				expect(sampleCreditPayment.created_at).toBeDefined()

				if (sampleCreditPayment.action) {
					expect(['payment', 'reduction', 'refund', 'write_off']).toContain(sampleCreditPayment.action)
				}
			}
		})

		// READ - Get single credit payment (only if we have a sample)
		it('should get a credit payment by ID', async () => {
			if (!canTest() || !sampleCreditPayment || !sampleCreditPayment.id) {
				console.log('Skipping credit payment get test - no sample credit payment available')
				return
			}

			const creditPayment = await service.getCreditPayment(sampleCreditPayment.id)

			expect(creditPayment).toBeDefined()
			expect(creditPayment.id).toBe(sampleCreditPayment.id)
			expect(creditPayment.object).toBe('credit_payment')
			expect(creditPayment.uuid).toBe(sampleCreditPayment.uuid)
			expect(creditPayment.currency).toBe(sampleCreditPayment.currency)
			expect(creditPayment.amount).toBe(sampleCreditPayment.amount)
			expect(creditPayment.created_at).toBe(sampleCreditPayment.created_at)
		})

		// READ - List account credit payments (only if we have a sample with account)
		it('should list account credit payments', async () => {
			if (!canTest() || !sampleCreditPayment || !sampleCreditPayment.account?.id) {
				console.log('Skipping account credit payments test - no sample credit payment with account available')
				return
			}

			const response: RecurlyCreditPaymentListResponse = await service.listAccountCreditPayments(
				sampleCreditPayment.account.id,
				{
					limit: 10,
					order: 'desc',
					sort: 'created_at',
				},
			)

			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)

			// Verify that all returned credit payments belong to the specified account
			if (response.data && response.data.length > 0) {
				response.data.forEach(creditPayment => {
					if (creditPayment.account?.id) {
						expect(creditPayment.account.id).toBe(sampleCreditPayment!.account!.id)
					}
				})
			}
		})

		// Additional test for pagination
		it('should handle pagination parameters correctly', async () => {
			if (!canTest()) return

			const response = await service.listCreditPayments({
				limit: 5,
				order: 'asc',
				sort: 'created_at',
			})

			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)

			// If we have results, check they don't exceed our limit
			if (response.data && response.data.length > 0) {
				expect(response.data.length).toBeLessThanOrEqual(5)
			}
		})

		// Test for date filtering
		it('should handle date filtering parameters', async () => {
			if (!canTest()) return

			// Test with a recent begin_time to ensure we don't get too old records
			const oneMonthAgo = new Date()
			oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

			const response = await service.listCreditPayments({
				limit: 10,
				begin_time: oneMonthAgo.toISOString(),
				order: 'desc',
				sort: 'created_at',
			})

			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)

			// Verify that returned credit payments are after the begin_time
			if (response.data && response.data.length > 0) {
				response.data.forEach(creditPayment => {
					if (creditPayment.created_at) {
						const createdAt = new Date(creditPayment.created_at)
						expect(createdAt.getTime()).toBeGreaterThanOrEqual(oneMonthAgo.getTime())
					}
				})
			}
		})
	})
})
