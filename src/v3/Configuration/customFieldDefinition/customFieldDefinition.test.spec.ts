import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { CustomFieldDefinitionService } from './customFieldDefinition.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('CustomFieldDefinitionService', () => {
	let service: CustomFieldDefinitionService
	let customFieldDefinitionId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<CustomFieldDefinitionService>(CustomFieldDefinitionService)
	})

	describe('Custom Field Definition Operations', () => {
		it('should list custom field definitions', async () => {
			const customFieldDefinitions = await service.listCustomFieldDefinitions()
			expect(customFieldDefinitions).toBeDefined()
			expect(customFieldDefinitions.data).toBeDefined()
			expect(Array.isArray(customFieldDefinitions.data)).toBe(true)

			// Store the first custom field definition ID for subsequent tests
			if (customFieldDefinitions.data && customFieldDefinitions.data.length > 0) {
				customFieldDefinitionId = customFieldDefinitions.data[0].id!
			}
		})

		it('should get a specific custom field definition', async () => {
			if (!customFieldDefinitionId) {
				console.warn('Skipping get custom field definition test - no custom field definition ID available')
				return
			}

			const customFieldDefinition = await service.getCustomFieldDefinition(customFieldDefinitionId)
			expect(customFieldDefinition).toBeDefined()
			expect(customFieldDefinition.id).toBe(customFieldDefinitionId)
			expect(customFieldDefinition.name).toBeDefined()
			expect(customFieldDefinition.related_type).toBeDefined()
		})

		it('should list custom field definitions with query parameters', async () => {
			const customFieldDefinitions = await service.listCustomFieldDefinitions({
				limit: 1,
				order: 'asc',
				sort: 'created_at',
			})
			expect(customFieldDefinitions).toBeDefined()
			expect(customFieldDefinitions.data).toBeDefined()
			expect(Array.isArray(customFieldDefinitions.data)).toBe(true)
		})

		it('should list custom field definitions filtered by related_type', async () => {
			const customFieldDefinitions = await service.listCustomFieldDefinitions({
				related_type: 'account',
				limit: 10,
			})
			expect(customFieldDefinitions).toBeDefined()
			expect(customFieldDefinitions.data).toBeDefined()
			expect(Array.isArray(customFieldDefinitions.data)).toBe(true)

			// If there are results, verify they match the filter
			if (customFieldDefinitions.data && customFieldDefinitions.data.length > 0) {
				customFieldDefinitions.data.forEach(definition => {
					if (definition.related_type) {
						expect(definition.related_type).toBe('account')
					}
				})
			}
		})
	})
})
