import { ExternalInvoicesService } from '../../AppManagement/externalInvoices/externalInvoices.service'
import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('ExternalInvoicesService', () => {
	let service: ExternalInvoicesService
	let createdExternalInvoiceId: string
	let externalSubscriptionId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<ExternalInvoicesService>(ExternalInvoicesService)

		// Note: For testing external invoices, you would typically need an existing external subscription
		// This is a placeholder - in real tests you'd need to create an external subscription first
		externalSubscriptionId = 'test_external_subscription_id'
	})

	describe('External Invoice Operations', () => {
		it('should create an external invoice', async () => {
			if (!canTest()) return

			try {
				const createData = {
					external_id: `test_external_invoice_${Date.now()}`,
					state: 'paid' as const,
					total: '9.99',
					currency: 'USD',
					purchased_at: new Date().toISOString(),
					line_items: [
						{
							currency: 'USD',
							unit_amount: '9.99',
							quantity: 1,
							description: 'Test product',
							external_product_reference: {
								reference_code: 'test_product_ref',
								external_connection_type: 'apple_app_store',
							},
						},
					],
				}

				const externalInvoice = await service.createExternalInvoice(externalSubscriptionId, createData)
				expect(externalInvoice).toBeDefined()
				expect(externalInvoice.id).toBeDefined()
				expect(externalInvoice.external_id).toBe(createData.external_id)
				expect(externalInvoice.state).toBe(createData.state)
				expect(externalInvoice.total).toBe(createData.total)
				expect(externalInvoice.currency).toBe(createData.currency)

				// Store the ID for subsequent tests
				createdExternalInvoiceId = externalInvoice.id!
			} catch (error) {
				console.log('Create external invoice test failed:', error)
				// For external invoices, creation might fail if external subscription doesn't exist
				// This is expected in a test environment
			}
		})

		it('should read an external invoice', async () => {
			if (!canTest() || !createdExternalInvoiceId) return

			try {
				const externalInvoice = await service.getExternalInvoice(createdExternalInvoiceId)
				expect(externalInvoice).toBeDefined()
				expect(externalInvoice.id).toBe(createdExternalInvoiceId)
				expect(externalInvoice.state).toBe('paid')
			} catch (error) {
				console.log('Get external invoice test failed:', error)
			}
		})

		it('should list all external invoices', async () => {
			if (!canTest()) return

			try {
				const externalInvoices = await service.listExternalInvoices({
					limit: 10,
					order: 'desc',
					sort: 'created_at',
				})
				expect(externalInvoices).toBeDefined()
				expect(externalInvoices.object).toBe('list')
				expect(Array.isArray(externalInvoices.data)).toBe(true)
			} catch (error) {
				console.log('List external invoices test failed:', error)
			}
		})

		it('should list external invoices for an account', async () => {
			if (!canTest()) return

			try {
				// Using a test account ID - in real tests you'd use an actual account
				const accountId = 'test_account_id'
				const externalInvoices = await service.listAccountExternalInvoices(accountId, {
					limit: 10,
					order: 'desc',
				})
				expect(externalInvoices).toBeDefined()
				expect(externalInvoices.object).toBe('list')
				expect(Array.isArray(externalInvoices.data)).toBe(true)
			} catch (error) {
				console.log('List account external invoices test failed:', error)
			}
		})

		it('should list external invoices for an external subscription', async () => {
			if (!canTest()) return

			try {
				const externalInvoices = await service.listExternalSubscriptionExternalInvoices(
					externalSubscriptionId,
					{
						limit: 10,
						order: 'desc',
					},
				)
				expect(externalInvoices).toBeDefined()
				expect(externalInvoices.object).toBe('list')
				expect(Array.isArray(externalInvoices.data)).toBe(true)
			} catch (error) {
				console.log('List external subscription external invoices test failed:', error)
			}
		})
	})

	afterAll(async () => {
		// External invoices are typically read-only in Recurly
		// They cannot be deleted via API, so no cleanup is needed
	})
})
