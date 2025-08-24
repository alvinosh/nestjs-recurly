import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { BusinessEntitiesService } from './businessEntities.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('BusinessEntitiesService', () => {
	let service: BusinessEntitiesService
	let businessEntityId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<BusinessEntitiesService>(BusinessEntitiesService)
	})

	describe('Business Entity Operations (Read)', () => {
		it('should list business entities', async () => {
			if (!canTest()) return

			const businessEntities = await service.listBusinessEntities()
			expect(businessEntities).toBeDefined()
			expect(businessEntities.data).toBeDefined()
			expect(Array.isArray(businessEntities.data)).toBe(true)

			// Store the first business entity ID for subsequent tests
			if (businessEntities.data && businessEntities.data.length > 0) {
				businessEntityId = businessEntities.data[0].id!
			}
		})

		it('should get a specific business entity', async () => {
			if (!canTest()) return

			if (!businessEntityId) {
				console.warn('Skipping get business entity test - no business entity ID available')
				return
			}

			const businessEntity = await service.getBusinessEntity(businessEntityId)
			expect(businessEntity).toBeDefined()
			expect(businessEntity.id).toBe(businessEntityId)
			expect(businessEntity.code).toBeDefined()
			expect(businessEntity.name).toBeDefined()
		})

		it('should list business entity invoices', async () => {
			if (!canTest()) return

			if (!businessEntityId) {
				console.warn('Skipping list business entity invoices test - no business entity ID available')
				return
			}

			const invoices = await service.listBusinessEntityInvoices(businessEntityId)
			expect(invoices).toBeDefined()
			expect(invoices.data).toBeDefined()
			expect(Array.isArray(invoices.data)).toBe(true)
		})

		it('should list business entities with query parameters', async () => {
			if (!canTest()) return

			const businessEntities = await service.listBusinessEntities({
				limit: 1,
				order: 'asc',
				sort: 'created_at',
			})
			expect(businessEntities).toBeDefined()
			expect(businessEntities.data).toBeDefined()
			expect(Array.isArray(businessEntities.data)).toBe(true)
		})

		it('should list business entity invoices with query parameters', async () => {
			if (!canTest()) return

			if (!businessEntityId) {
				console.warn(
					'Skipping list business entity invoices with params test - no business entity ID available',
				)
				return
			}

			const invoices = await service.listBusinessEntityInvoices(businessEntityId, {
				limit: 5,
				order: 'desc',
				sort: 'created_at',
			})
			expect(invoices).toBeDefined()
			expect(invoices.data).toBeDefined()
			expect(Array.isArray(invoices.data)).toBe(true)
		})
	})
})
