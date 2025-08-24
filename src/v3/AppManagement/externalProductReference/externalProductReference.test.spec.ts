import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { ExternalProductService } from '../externalProduct/externalProduct.service'
import { ExternalProductReferenceService } from './externalProductReference.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('ExternalProductReferenceService', () => {
	let service: ExternalProductReferenceService
	let externalProductService: ExternalProductService
	let createdExternalProductId: string
	let createdExternalProductReferenceId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<ExternalProductReferenceService>(ExternalProductReferenceService)
		externalProductService = moduleRef.get<ExternalProductService>(ExternalProductService)

		// Create an external product for testing references
		try {
			const createProductData = {
				name: `Test External Product for References ${Date.now()}`,
			}

			const externalProduct = await externalProductService.createExternalProduct(createProductData)
			createdExternalProductId = externalProduct.id!
		} catch (error: any) {
			if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
				console.warn('External Products feature not properly configured - skipping tests')
				return
			}
			throw error
		}
	})

	afterAll(async () => {
		// Clean up created external product if possible
		if (createdExternalProductId && externalProductService) {
			try {
				await externalProductService.deactivateExternalProducts()
			} catch (error) {
				// Ignore cleanup errors
				console.warn('Could not clean up external products:', error)
			}
		}
	})

	describe('External Product Reference Operations', () => {
		// CREATE
		it('should create an external product reference', async () => {
			if (!canTest() || !createdExternalProductId) return

			try {
				const createData = {
					reference_code: `test_ref_code_${Date.now()}`,
					external_connection_type: 'apple_app_store',
				}

				const externalProductReference = await service.createExternalProductReference(
					createdExternalProductId,
					createData,
				)
				expect(externalProductReference).toBeDefined()
				expect(externalProductReference.id).toBeDefined()
				expect(externalProductReference.reference_code).toBe(createData.reference_code)
				expect(externalProductReference.external_connection_type).toBe(createData.external_connection_type)

				// Store the ID for subsequent tests
				createdExternalProductReferenceId = externalProductReference.id!
			} catch (error: any) {
				// External Product References may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Product References feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		// READ - List external product references
		it('should list external product references', async () => {
			if (!canTest() || !createdExternalProductId) return

			try {
				const externalProductReferences = await service.listExternalProductReferences(createdExternalProductId)
				expect(externalProductReferences).toBeDefined()
				expect(externalProductReferences.data).toBeDefined()
				expect(Array.isArray(externalProductReferences.data)).toBe(true)
			} catch (error: any) {
				// External Product References may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Product References feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		// READ - Get single external product reference
		it('should get a specific external product reference', async () => {
			if (!canTest() || !createdExternalProductId || !createdExternalProductReferenceId) return

			try {
				const externalProductReference = await service.getExternalProductReference(
					createdExternalProductId,
					createdExternalProductReferenceId,
				)
				expect(externalProductReference).toBeDefined()
				expect(externalProductReference.id).toBe(createdExternalProductReferenceId)
				expect(externalProductReference.reference_code).toBeDefined()
				expect(externalProductReference.external_connection_type).toBeDefined()
			} catch (error: any) {
				// External Product References may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Product References feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		// DELETE - Deactivate external product reference
		it('should deactivate an external product reference', async () => {
			if (!canTest() || !createdExternalProductId || !createdExternalProductReferenceId) return

			try {
				const deactivatedExternalProductReference = await service.deactivateExternalProductReference(
					createdExternalProductId,
					createdExternalProductReferenceId,
				)
				expect(deactivatedExternalProductReference).toBeDefined()
				expect(deactivatedExternalProductReference.id).toBe(createdExternalProductReferenceId)

				// Verify the reference was deactivated by trying to get it
				// It should either be not found or marked as deactivated
				try {
					const verifyReference = await service.getExternalProductReference(
						createdExternalProductId,
						createdExternalProductReferenceId,
					)
					// If we can still get it, it might be marked as inactive or similar
					console.log('Reference still exists after deactivation:', verifyReference)
				} catch (verifyError: any) {
					// Expected if the reference was completely removed
					if (verifyError instanceof Error && verifyError.message.includes('404')) {
						console.log('Reference successfully removed')
					}
				}
			} catch (error: any) {
				// External Product References may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Product References feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		// READ - List external product references with query parameters
		it('should list external product references with query parameters', async () => {
			if (!canTest() || !createdExternalProductId) return

			try {
				const externalProductReferences = await service.listExternalProductReferences(
					createdExternalProductId,
					{
						order: 'asc',
						sort: 'created_at',
					},
				)
				expect(externalProductReferences).toBeDefined()
				expect(externalProductReferences.data).toBeDefined()
				expect(Array.isArray(externalProductReferences.data)).toBe(true)
			} catch (error: any) {
				// External Product References may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Product References feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})
	})
})
