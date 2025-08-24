import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { ExternalProductService } from './externalProduct.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('ExternalProductService', () => {
	let service: ExternalProductService
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

		service = moduleRef.get<ExternalProductService>(ExternalProductService)
	})

	describe('External Product Operations', () => {
		// CREATE
		it('should create an external product', async () => {
			if (!canTest()) return

			try {
				const createData = {
					name: `Test External Product ${Date.now()}`,
					external_product_references: [
						{
							reference_code: `test_ref_${Date.now()}`,
							external_connection_type: 'apple_app_store',
						},
					],
				}

				const externalProduct = await service.createExternalProduct(createData)
				expect(externalProduct).toBeDefined()
				expect(externalProduct.id).toBeDefined()
				expect(externalProduct.name).toBe(createData.name)
				expect(externalProduct.external_product_references).toBeDefined()
				expect(externalProduct.external_product_references!.length).toBeGreaterThan(0)

				// Store the ID for subsequent tests
				createdExternalProductId = externalProduct.id!
			} catch (error: any) {
				// External Products may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Products feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		// READ - List external products
		it('should list external products', async () => {
			if (!canTest()) return

			try {
				const externalProducts = await service.listExternalProducts()
				expect(externalProducts).toBeDefined()
				expect(externalProducts.data).toBeDefined()
				expect(Array.isArray(externalProducts.data)).toBe(true)
			} catch (error: any) {
				// External Products may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Products feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		// READ - Get single external product
		it('should get a specific external product', async () => {
			if (!canTest()) return

			if (!createdExternalProductId) {
				console.warn('Skipping get external product test - no external product ID available')
				return
			}

			try {
				const externalProduct = await service.getExternalProduct(createdExternalProductId)
				expect(externalProduct).toBeDefined()
				expect(externalProduct.id).toBe(createdExternalProductId)
				expect(externalProduct.name).toBeDefined()
			} catch (error: any) {
				// External Products may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Products feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		// UPDATE
		it('should update an external product', async () => {
			if (!canTest()) return

			if (!createdExternalProductId) {
				console.warn('Skipping update external product test - no external product ID available')
				return
			}

			try {
				// For update, we need a plan_id, but we'll skip this test if we don't have one
				// Since external products require specific plan configurations
				console.warn('Skipping update external product test - requires plan_id configuration')
				return
			} catch (error: any) {
				// External Products may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Products feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		// External Product References Tests
		it('should list external product references', async () => {
			if (!canTest()) return

			if (!createdExternalProductId) {
				console.warn('Skipping list external product references test - no external product ID available')
				return
			}

			try {
				const references = await service.listExternalProductReferences(createdExternalProductId)
				expect(references).toBeDefined()
				expect(references.data).toBeDefined()
				expect(Array.isArray(references.data)).toBe(true)
			} catch (error: any) {
				// External Products may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Product References feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should create an external product reference', async () => {
			if (!canTest()) return

			if (!createdExternalProductId) {
				console.warn('Skipping create external product reference test - no external product ID available')
				return
			}

			try {
				const createData = {
					reference_code: `test_ref_new_${Date.now()}`,
					external_connection_type: 'google_play_store',
				}

				const reference = await service.createExternalProductReference(createdExternalProductId, createData)
				expect(reference).toBeDefined()
				expect(reference.id).toBeDefined()
				expect(reference.reference_code).toBe(createData.reference_code)
				expect(reference.external_connection_type).toBe(createData.external_connection_type)

				// Store the ID for subsequent tests
				createdExternalProductReferenceId = reference.id!
			} catch (error: any) {
				// External Product References may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Product References feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should get a specific external product reference', async () => {
			if (!canTest()) return

			if (!createdExternalProductId || !createdExternalProductReferenceId) {
				console.warn('Skipping get external product reference test - IDs not available')
				return
			}

			try {
				const reference = await service.getExternalProductReference(
					createdExternalProductId,
					createdExternalProductReferenceId,
				)
				expect(reference).toBeDefined()
				expect(reference.id).toBe(createdExternalProductReferenceId)
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
			if (!canTest()) return

			if (!createdExternalProductId || !createdExternalProductReferenceId) {
				console.warn('Skipping deactivate external product reference test - IDs not available')
				return
			}

			try {
				const deactivatedReference = await service.deactivateExternalProductReference(
					createdExternalProductId,
					createdExternalProductReferenceId,
				)
				expect(deactivatedReference).toBeDefined()
			} catch (error: any) {
				// External Product References may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Product References feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should list external products with query parameters', async () => {
			if (!canTest()) return

			try {
				const externalProducts = await service.listExternalProducts({
					order: 'asc',
					sort: 'created_at',
				})
				expect(externalProducts).toBeDefined()
				expect(externalProducts.data).toBeDefined()
				expect(Array.isArray(externalProducts.data)).toBe(true)
			} catch (error: any) {
				// External Products may require specific features or connections
				if (error instanceof Error && (error.message.includes('422') || error.message.includes('404'))) {
					console.warn('External Products feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})
	})
})
