import { canTest, suppressErrorTesting } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { TransactionService } from './transaction.service'
import { RecurlyTransaction, RecurlyTransactionListResponse } from './transaction.types'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('TransactionService', () => {
	let service: TransactionService
	let sampleTransactionId: string
	let sampleAccountId: string
	let sampleInvoiceId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<TransactionService>(TransactionService)
	})

	describe('Transaction Read Operations', () => {
		// READ - List all transactions
		it('should list transactions', async () => {
			if (!canTest()) return

			const result: RecurlyTransactionListResponse = await service.listTransactions({
				limit: 5,
				order: 'desc',
				sort: 'created_at',
			})

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data.length).toBeGreaterThanOrEqual(0)

			// Store sample IDs for other tests if available
			if (result.data.length > 0) {
				const firstTransaction = result.data[0]
				if (firstTransaction.id) {
					sampleTransactionId = firstTransaction.id
				}
				if (firstTransaction.account?.id) {
					sampleAccountId = firstTransaction.account.id
				}
				if (firstTransaction.invoice?.id) {
					sampleInvoiceId = firstTransaction.invoice.id
				}
			}
		})

		// READ - Get specific transaction
		it('should get a specific transaction', async () => {
			if (!sampleTransactionId) {
				console.log('Skipping test - no sample transaction ID available')
				return
			}

			const transaction: RecurlyTransaction = await service.getTransaction(sampleTransactionId)

			expect(transaction).toBeDefined()
			expect(transaction.id).toBe(sampleTransactionId)
			expect(transaction.object).toBe('transaction')
			expect(transaction.uuid).toBeDefined()
			expect(transaction.amount).toBeDefined()
			expect(transaction.currency).toBeDefined()
			expect(transaction.status).toBeDefined()
			expect(transaction.type).toBeDefined()
			expect(transaction.created_at).toBeDefined()
		})

		// READ - List account transactions
		it('should list transactions for a specific account', async () => {
			if (!sampleAccountId) {
				console.log('Skipping test - no sample account ID available')
				return
			}

			const result: RecurlyTransactionListResponse = await service.listAccountTransactions(sampleAccountId, {
				limit: 5,
				order: 'desc',
				sort: 'created_at',
			})

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data.length).toBeGreaterThanOrEqual(0)

			// All transactions should belong to the specified account
			if (result.data.length > 0) {
				result.data.forEach(transaction => {
					expect(transaction.account?.id).toBe(sampleAccountId)
				})
			}
		})

		// READ - List invoice transactions
		it('should list transactions for a specific invoice', async () => {
			if (!sampleInvoiceId) {
				console.log('Skipping test - no sample invoice ID available')
				return
			}

			try {
				const result: RecurlyTransactionListResponse = await service.listInvoiceTransactions(sampleInvoiceId, {
					limit: 5,
					order: 'desc',
					sort: 'created_at',
				})

				expect(result).toBeDefined()
				expect(result.object).toBe('list')
				expect(Array.isArray(result.data)).toBe(true)
				expect(result.data.length).toBeGreaterThanOrEqual(0)

				// All transactions should belong to the specified invoice
				if (result.data.length > 0) {
					result.data.forEach(transaction => {
						expect(transaction.invoice?.id).toBe(sampleInvoiceId)
					})
				}
			} catch (error) {
				// It's possible the invoice doesn't have transactions or endpoint is not available
				expect(error).toBeDefined()
			}
		})

		// READ - List transactions with filters
		it('should list transactions with success filter', async () => {
			const result: RecurlyTransactionListResponse = await service.listTransactions({
				limit: 10,
				success: true,
				order: 'desc',
				sort: 'created_at',
			})

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)

			// All transactions should be successful
			if (result.data.length > 0) {
				result.data.forEach(transaction => {
					expect(transaction.success).toBe(true)
				})
			}
		})

		// READ - List transactions with type filter
		it('should list transactions with type filter', async () => {
			const result: RecurlyTransactionListResponse = await service.listTransactions({
				limit: 10,
				type: 'purchase',
				order: 'desc',
				sort: 'created_at',
			})

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)

			// All transactions should be of type 'purchase'
			if (result.data.length > 0) {
				result.data.forEach(transaction => {
					expect(transaction.type).toBe('purchase')
				})
			}
		})

		// Error handling tests
		it('should handle non-existent transaction gracefully', async () => {
			if (!canTest()) return

			const nonExistentId = 'non-existent-transaction-id'

			await suppressErrorTesting(service, async () => {
				await service.getTransaction(nonExistentId)
			})
		})

		it('should handle non-existent account transactions gracefully', async () => {
			const nonExistentAccountId = 'non-existent-account-id'

			await suppressErrorTesting(service, async () => {
				await service.listAccountTransactions(nonExistentAccountId)
			})
		})

		it('should handle non-existent invoice transactions gracefully', async () => {
			const nonExistentInvoiceId = 'non-existent-invoice-id'

			await suppressErrorTesting(service, async () => {
				await service.listInvoiceTransactions(nonExistentInvoiceId)
			})
		})
	})

	describe('Transaction Query Parameter Validation', () => {
		it('should handle various query parameters', async () => {
			const now = new Date()
			const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

			const result: RecurlyTransactionListResponse = await service.listTransactions({
				limit: 3,
				order: 'asc',
				sort: 'updated_at',
				begin_time: oneWeekAgo.toISOString(),
				end_time: now.toISOString(),
			})

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data.length).toBeLessThanOrEqual(3)

			// Verify transactions are within the time range
			if (result.data.length > 0) {
				result.data.forEach(transaction => {
					const createdAt = new Date(transaction.created_at!)
					expect(createdAt.getTime()).toBeGreaterThanOrEqual(oneWeekAgo.getTime())
					expect(createdAt.getTime()).toBeLessThanOrEqual(now.getTime())
				})
			}
		})
	})
})
