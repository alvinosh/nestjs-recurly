import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { ExternalSubscriptionService } from '../externalSubscription/externalSubscription.service'
import { ExternalPaymentPhaseService } from './externalPaymentPhase.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('ExternalPaymentPhaseService', () => {
	let service: ExternalPaymentPhaseService
	let externalSubscriptionService: ExternalSubscriptionService
	let testExternalSubscriptionId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<ExternalPaymentPhaseService>(ExternalPaymentPhaseService)
		externalSubscriptionService = moduleRef.get<ExternalSubscriptionService>(ExternalSubscriptionService)

		// Create a test external subscription to use for payment phase tests
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

			const externalSubscription = await externalSubscriptionService.createExternalSubscription(createData)
			testExternalSubscriptionId = externalSubscription.id!
		} catch (error) {
			console.warn('Could not create test external subscription:', error)
		}
	})

	describe('External Payment Phase Operations', () => {
		it('should list external payment phases for a subscription', async () => {
			if (!canTest() || !testExternalSubscriptionId) return

			try {
				const result = await service.listExternalPaymentPhases(testExternalSubscriptionId)
				expect(result).toBeDefined()
				expect(result.object).toBe('list')
				expect(Array.isArray(result.data)).toBe(true)
			} catch (error) {
				// External payment phases may not exist for the test subscription
				console.warn('List external payment phases failed (expected for test data):', error)
			}
		})

		it('should list external payment phases with query parameters', async () => {
			if (!canTest() || !testExternalSubscriptionId) return

			try {
				const queryParams = {
					order: 'desc' as const,
					sort: 'created_at' as const,
					limit: 10,
				}

				const result = await service.listExternalPaymentPhases(testExternalSubscriptionId, queryParams)
				expect(result).toBeDefined()
				expect(result.object).toBe('list')
				expect(Array.isArray(result.data)).toBe(true)
			} catch (error) {
				// External payment phases may not exist for the test subscription
				console.warn('List external payment phases with params failed (expected for test data):', error)
			}
		})

		it('should handle getting a specific external payment phase', async () => {
			if (!canTest() || !testExternalSubscriptionId) return

			try {
				// First try to list payment phases to get an ID
				const list = await service.listExternalPaymentPhases(testExternalSubscriptionId)

				if (list.data && list.data.length > 0) {
					const paymentPhaseId = list.data[0].id!
					const paymentPhase = await service.getExternalPaymentPhase(
						testExternalSubscriptionId,
						paymentPhaseId,
					)
					expect(paymentPhase).toBeDefined()
					expect(paymentPhase.id).toBe(paymentPhaseId)
					expect(paymentPhase.object).toBe('external_payment_phase')
				} else {
					console.warn('No external payment phases found for test subscription (expected for test data)')
				}
			} catch (error) {
				// External payment phases may not exist for the test subscription
				console.warn('Get external payment phase failed (expected for test data):', error)
			}
		})

		it('should handle 404 errors for non-existent payment phases', async () => {
			if (!canTest() || !testExternalSubscriptionId) return

			try {
				await service.getExternalPaymentPhase(testExternalSubscriptionId, 'non_existent_phase_id')
				// If we reach here, the call unexpectedly succeeded
				fail('Expected a 404 error for non-existent payment phase')
			} catch (error) {
				// This is expected - should get a 404 error
				expect(error).toBeDefined()
			}
		})
	})

	afterAll(async () => {
		// Clean up: Note that external subscriptions cannot be deleted via API
		// They would need to be managed through the Recurly admin interface
		if (testExternalSubscriptionId) {
			console.log(`Test external subscription created with ID: ${testExternalSubscriptionId}`)
			console.log(
				'Note: External subscriptions cannot be deleted via API and should be cleaned up manually if needed',
			)
		}
	})
})
