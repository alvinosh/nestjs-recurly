import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { ExternalSubscriptionService } from './externalSubscription.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('ExternalSubscriptionService', () => {
	let service: ExternalSubscriptionService
	let createdExternalSubscriptionId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<ExternalSubscriptionService>(ExternalSubscriptionService)
	})

	describe('External Subscription Operations', () => {
		it('should create an external subscription', async () => {
			if (!canTest()) return

			try {
				const createData = {
					external_product_reference: {
						reference_code: 'test_product_ref_code',
						external_connection_type: 'apple_app_store',
					},
					external_id: `test_external_id_${Date.now()}`,
					app_identifier: 'com.example.testapp',
					quantity: 1,
					state: 'active' as const,
					auto_renew: true,
					last_purchased: new Date().toISOString(),
				}

				const externalSubscription = await service.createExternalSubscription(createData)
				expect(externalSubscription).toBeDefined()
				expect(externalSubscription.id).toBeDefined()
				expect(externalSubscription.external_id).toBe(createData.external_id)
				expect(externalSubscription.state).toBe(createData.state)
				expect(externalSubscription.auto_renew).toBe(createData.auto_renew)
				expect(externalSubscription.quantity).toBe(createData.quantity)

				// Store the ID for subsequent tests
				createdExternalSubscriptionId = externalSubscription.id!
			} catch (error: any) {
				// External Subscriptions may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Subscriptions feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should list external subscriptions', async () => {
			if (!canTest()) return

			try {
				const externalSubscriptions = await service.listExternalSubscriptions()
				expect(externalSubscriptions).toBeDefined()
				expect(externalSubscriptions.data).toBeDefined()
				expect(Array.isArray(externalSubscriptions.data)).toBe(true)
			} catch (error: any) {
				// External Subscriptions may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Subscriptions feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should get a specific external subscription', async () => {
			if (!canTest()) return

			if (!createdExternalSubscriptionId) {
				console.warn('Skipping get external subscription test - no external subscription ID available')
				return
			}

			try {
				const externalSubscription = await service.getExternalSubscription(createdExternalSubscriptionId)
				expect(externalSubscription).toBeDefined()
				expect(externalSubscription.id).toBe(createdExternalSubscriptionId)
				expect(externalSubscription.external_id).toBeDefined()
			} catch (error: any) {
				// External Subscriptions may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Subscriptions feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should update an external subscription', async () => {
			if (!canTest()) return

			if (!createdExternalSubscriptionId) {
				console.warn('Skipping update external subscription test - no external subscription ID available')
				return
			}

			try {
				const updateData = {
					quantity: 2,
					auto_renew: false,
				}

				const updatedExternalSubscription = await service.updateExternalSubscription(
					createdExternalSubscriptionId,
					updateData,
				)
				expect(updatedExternalSubscription).toBeDefined()
				expect(updatedExternalSubscription.id).toBe(createdExternalSubscriptionId)
				expect(updatedExternalSubscription.quantity).toBe(updateData.quantity)
				expect(updatedExternalSubscription.auto_renew).toBe(updateData.auto_renew)

				// Verify the changes by reading again
				const verifyExternalSubscription = await service.getExternalSubscription(createdExternalSubscriptionId)
				expect(verifyExternalSubscription.quantity).toBe(updateData.quantity)
				expect(verifyExternalSubscription.auto_renew).toBe(updateData.auto_renew)
			} catch (error: any) {
				// External Subscriptions may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Subscriptions feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should list external subscriptions with query parameters', async () => {
			if (!canTest()) return

			try {
				const externalSubscriptions = await service.listExternalSubscriptions({
					order: 'asc',
					sort: 'created_at',
				})
				expect(externalSubscriptions).toBeDefined()
				expect(externalSubscriptions.data).toBeDefined()
				expect(Array.isArray(externalSubscriptions.data)).toBe(true)
			} catch (error: any) {
				// External Subscriptions may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Subscriptions feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})
	})
})
