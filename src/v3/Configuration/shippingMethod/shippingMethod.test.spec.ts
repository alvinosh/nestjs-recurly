import { RecurlyCreateShippingMethodDto, RecurlyUpdateShippingMethodDto } from './shippingMethod.dtos'
import { ShippingMethodService } from './shippingMethod.service'
import { RecurlyShippingMethod } from './shippingMethod.types'
import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('ShippingMethodService', () => {
	let service: ShippingMethodService
	let createdShippingMethodId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<ShippingMethodService>(ShippingMethodService)
	})

	describe('CRUD Operations', () => {
		it('should create a shipping method', async () => {
			const createData: RecurlyCreateShippingMethodDto = {
				code: 'test-shipping-method',
				name: 'Test Shipping Method',
				accounting_code: 'SHIP001',
				tax_code: 'FR',
			}

			const result: RecurlyShippingMethod = await service.createShippingMethod(createData)

			expect(result).toBeDefined()
			expect(result.code).toBe(createData.code)
			expect(result.name).toBe(createData.name)
			expect(result.accounting_code).toBe(createData.accounting_code)
			expect(result.tax_code).toBe(createData.tax_code)
			expect(result.id).toBeDefined()

			// Store the created shipping method ID for other tests
			createdShippingMethodId = result.id!
		})

		it('should list shipping methods', async () => {
			const result = await service.listShippingMethods({ limit: 10 })

			expect(result).toBeDefined()
			expect(result.data).toBeDefined()
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data.length).toBeGreaterThan(0)

			// Check if our created shipping method is in the list
			const foundShippingMethod = result.data.find(sm => sm.id === createdShippingMethodId)
			expect(foundShippingMethod).toBeDefined()
		})

		it('should get a specific shipping method', async () => {
			const result: RecurlyShippingMethod = await service.getShippingMethod(createdShippingMethodId)

			expect(result).toBeDefined()
			expect(result.id).toBe(createdShippingMethodId)
			expect(result.code).toBe('test-shipping-method')
			expect(result.name).toBe('Test Shipping Method')
		})

		it('should update a shipping method', async () => {
			const updateData: RecurlyUpdateShippingMethodDto = {
				name: 'Updated Test Shipping Method',
				accounting_code: 'SHIP002',
			}

			const result: RecurlyShippingMethod = await service.updateShippingMethod(
				createdShippingMethodId,
				updateData,
			)

			expect(result).toBeDefined()
			expect(result.id).toBe(createdShippingMethodId)
			expect(result.name).toBe(updateData.name)
			expect(result.accounting_code).toBe(updateData.accounting_code)

			// Verify the update by reading the shipping method again
			const verifyResult: RecurlyShippingMethod = await service.getShippingMethod(createdShippingMethodId)
			expect(verifyResult.name).toBe(updateData.name)
			expect(verifyResult.accounting_code).toBe(updateData.accounting_code)
		})

		it('should deactivate a shipping method', async () => {
			const result: RecurlyShippingMethod = await service.deactivateShippingMethod(createdShippingMethodId)

			expect(result).toBeDefined()
			expect(result.id).toBe(createdShippingMethodId)
			expect(result.deleted_at).toBeDefined()

			// Verify the deactivation by reading the shipping method again
			const verifyResult: RecurlyShippingMethod = await service.getShippingMethod(createdShippingMethodId)
			expect(verifyResult.deleted_at).toBeDefined()
		})
	})
})
