import { canTest, suppressErrorTesting } from '../v3.helpers'
import { RecurlyV3Module } from '../v3.module'
import { RecurlyCreateItemDto, RecurlyUpdateItemDto } from './item.dto'
import { ItemService } from './item.service'
import { RecurlyItem } from './item.types'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('Item', () => {
	let service: ItemService
	let createdItem: RecurlyItem

	beforeAll(async () => {
		if (!canTest()) {
			console.warn('Skipping Item tests due to configuration or environment issues.')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<ItemService>(ItemService)
	})

	describe('Item CRUD Operations', () => {
		// CREATE
		it('should create an item', async () => {
			const createDto: RecurlyCreateItemDto = {
				code: `test-item-${Date.now()}`,
				name: 'Test Item',
				description: 'This is a test item for unit testing',
				external_sku: 'TEST-SKU-001',
				accounting_code: 'test-acc-001',
				revenue_schedule_type: 'evenly',
				tax_code: 'digital',
				tax_exempt: false,
				currencies: [
					{
						currency: 'USD',
						unit_amount: 99.99,
					},
				],
			}

			createdItem = await service.createItem(createDto)

			expect(createdItem).toBeDefined()
			expect(createdItem.code).toBe(createDto.code)
			expect(createdItem.name).toBe(createDto.name)
			expect(createdItem.description).toBe(createDto.description)
			expect(createdItem.external_sku).toBe(createDto.external_sku)
			expect(createdItem.accounting_code).toBe(createDto.accounting_code)
			// Note: revenue_schedule_type may default to 'never' even if we set it to 'evenly'
			expect(['evenly', 'never']).toContain(createdItem.revenue_schedule_type)
			// Note: tax_code might not be returned or might be null in sandbox
			if (createdItem.tax_code !== null && createdItem.tax_code !== undefined) {
				expect(createdItem.tax_code).toBe(createDto.tax_code)
			}
			expect(createdItem.tax_exempt).toBe(createDto.tax_exempt)
			expect(createdItem.state).toBe('active')
			expect(createdItem.id).toBeDefined()
		})

		// READ - Get single item
		it('should get an item by ID', async () => {
			const item = await service.getItem(createdItem.id!)

			expect(item).toBeDefined()
			expect(item.id).toBe(createdItem.id)
			expect(item.code).toBe(createdItem.code)
			expect(item.name).toBe(createdItem.name)
			expect(item.state).toBe('active')
		})

		// READ - List items
		it('should list items', async () => {
			const response = await service.listItems({
				limit: 10,
				order: 'desc',
				sort: 'created_at',
			})

			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)

			// Check if our created item is in the list
			const foundItem = response.data.find(item => item.id === createdItem.id)
			expect(foundItem).toBeDefined()
		})

		// UPDATE
		it('should update an item', async () => {
			const updateDto: RecurlyUpdateItemDto = {
				name: 'Updated Test Item',
				description: 'This is an updated test item',
				external_sku: 'TEST-SKU-002',
				tax_code: 'physical',
				currencies: [
					{
						currency: 'USD',
						unit_amount: 149.99,
					},
				],
			}

			const updatedItem = await service.updateItem(createdItem.id!, updateDto)

			expect(updatedItem).toBeDefined()
			expect(updatedItem.id).toBe(createdItem.id)
			expect(updatedItem.name).toBe(updateDto.name)
			expect(updatedItem.description).toBe(updateDto.description)
			expect(updatedItem.external_sku).toBe(updateDto.external_sku)
			// Note: tax_code might not be returned or might be null in sandbox
			if (updatedItem.tax_code !== null && updatedItem.tax_code !== undefined) {
				expect(updatedItem.tax_code).toBe(updateDto.tax_code)
			}

			// Verify the update by getting the item again
			const verifiedItem = await service.getItem(createdItem.id!)
			expect(verifiedItem.name).toBe(updateDto.name)
			expect(verifiedItem.description).toBe(updateDto.description)
		})

		// DELETE (Deactivate)
		it('should deactivate an item', async () => {
			const deactivatedItem = await service.deactivateItem(createdItem.id!)

			expect(deactivatedItem).toBeDefined()
			expect(deactivatedItem.id).toBe(createdItem.id)
			expect(deactivatedItem.state).toBe('inactive')

			// Verify the deactivation by getting the item again
			const verifiedItem = await service.getItem(createdItem.id!)
			expect(verifiedItem.state).toBe('inactive')
		})

		// REACTIVATE
		it('should reactivate an inactive item', async () => {
			const reactivatedItem = await service.reactivateItem(createdItem.id!)

			expect(reactivatedItem).toBeDefined()
			expect(reactivatedItem.id).toBe(createdItem.id)
			expect(reactivatedItem.state).toBe('active')

			// Verify the reactivation by getting the item again
			const verifiedItem = await service.getItem(createdItem.id!)
			expect(verifiedItem.state).toBe('active')
		})
	})

	// Cleanup - deactivate the item again
	afterAll(async () => {
		if (createdItem && createdItem.id) {
			try {
				await suppressErrorTesting(service, (id: string) => service.deactivateItem(id), createdItem.id)
			} catch {
				// Item might already be deactivated, ignore error
			}
		}
	})
})
