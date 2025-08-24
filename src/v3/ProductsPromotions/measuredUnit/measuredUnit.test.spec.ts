import { canTest, suppressErrorTesting } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { RecurlyCreateMeasuredUnitDto, RecurlyUpdateMeasuredUnitDto } from './measuredUnit.dto'
import { MeasuredUnitService } from './measuredUnit.service'
import { RecurlyMeasuredUnit } from './measuredUnit.types'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('MeasuredUnit', () => {
	let service: MeasuredUnitService
	let module: TestingModule
	let createdMeasuredUnit: RecurlyMeasuredUnit

	beforeAll(async () => {
		if (!canTest()) return

		module = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = module.get<MeasuredUnitService>(MeasuredUnitService)
	})

	// CREATE - Create a measured unit
	it('should create a measured unit', async () => {
		const createData: RecurlyCreateMeasuredUnitDto = {
			name: `test-unit-${Date.now()}`,
			display_name: 'Test Unit',
			description: 'Test measured unit for automated tests',
		}

		createdMeasuredUnit = await service.createMeasuredUnit(createData)

		expect(createdMeasuredUnit).toBeDefined()
		expect(createdMeasuredUnit?.name).toBe(createData.name)
		expect(createdMeasuredUnit?.display_name).toBe(createData.display_name)
		expect(createdMeasuredUnit?.description).toBe(createData.description)
		expect(createdMeasuredUnit?.state).toBe('active')
	})

	// READ - Get a specific measured unit
	it('should get a specific measured unit', async () => {
		const measuredUnit = await service.getMeasuredUnit(createdMeasuredUnit.id as string)

		expect(measuredUnit).toBeDefined()
		expect(measuredUnit.id).toBe(createdMeasuredUnit.id)
		expect(measuredUnit.name).toBe(createdMeasuredUnit.name)
		expect(measuredUnit.display_name).toBe(createdMeasuredUnit.display_name)
		expect(measuredUnit.state).toBe('active')
	})

	// READ - List measured units
	it('should list measured units', async () => {
		const response = await service.listMeasuredUnits({
			limit: 10,
			order: 'desc',
			sort: 'created_at',
		})

		expect(response).toBeDefined()
		expect(response.object).toBe('list')
		expect(Array.isArray(response.data)).toBe(true)

		// Check if our created measured unit is in the list
		if (createdMeasuredUnit?.id) {
			const foundUnit = response.data.find(u => u.id === createdMeasuredUnit?.id)
			expect(foundUnit).toBeDefined()
		}
	})

	// UPDATE - Update a measured unit
	it('should update a measured unit', async () => {
		const updateData: RecurlyUpdateMeasuredUnitDto = {
			display_name: 'Updated Test Unit',
			description: 'Updated description for automated tests',
		}

		const updatedUnit = await service.updateMeasuredUnit(createdMeasuredUnit.id as string, updateData)

		expect(updatedUnit).toBeDefined()
		expect(updatedUnit.id).toBe(createdMeasuredUnit.id)
		expect(updatedUnit.display_name).toBe(updateData.display_name)
		expect(updatedUnit.description).toBe(updateData.description)

		// Also verify by fetching the unit again
		const fetchedUnit = await service.getMeasuredUnit(createdMeasuredUnit.id as string)
		expect(fetchedUnit.display_name).toBe(updateData.display_name)
		expect(fetchedUnit.description).toBe(updateData.description)
	})

	// DELETE - Remove a measured unit
	it('should remove a measured unit', async () => {
		const removedUnit = await service.removeMeasuredUnit(createdMeasuredUnit.id as string)

		expect(removedUnit).toBeDefined()
		expect(removedUnit.id).toBe(createdMeasuredUnit.id)
		expect(removedUnit.state).toBe('inactive')

		// Verify it's inactive by fetching again
		const fetchedUnit = await service.getMeasuredUnit(createdMeasuredUnit.id as string)
		expect(fetchedUnit.state).toBe('inactive')
	})

	afterAll(async () => {
		try {
			// Clean up test measured unit if it exists
			if (createdMeasuredUnit?.id) {
				await suppressErrorTesting(
					service,
					(id: string) => service.removeMeasuredUnit(id),
					createdMeasuredUnit.id,
				)
			}
		} catch {
			// Ignore cleanup errors
		}
	})
})
