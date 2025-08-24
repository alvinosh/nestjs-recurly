import { canTest, suppressErrorTesting } from '../../../v3.helpers'
import { RecurlyV3Module } from '../../../v3.module'
import { PlanService } from '../plan.service'
import { RecurlyPlan } from '../plan.types'
import { RecurlyCreatePlanAddOnDto, RecurlyUpdatePlanAddOnDto } from './addon.dto'
import { AddOnService } from './addon.service'
import { RecurlyAddOn } from './addon.types'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('AddOn', () => {
	let service: AddOnService
	let planService: PlanService
	let module: TestingModule
	let createdPlan: RecurlyPlan
	let createdAddOn: RecurlyAddOn

	beforeAll(async () => {
		if (!canTest()) return

		module = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = module.get<AddOnService>(AddOnService)
		planService = module.get<PlanService>(PlanService)

		// Create a test plan first
		createdPlan = await planService.createPlan({
			code: `test-plan-${Date.now()}`,
			name: 'Test Plan for Add-ons',
			currencies: [{ currency: 'USD', unit_amount: 10 }],
		})

		expect(createdPlan).toBeDefined()
		expect(createdPlan.id).toBeDefined()
	})

	// CREATE - Create a plan add-on
	it('should create a plan add-on', async () => {
		const createData: RecurlyCreatePlanAddOnDto = {
			code: `test-addon-${Date.now()}`,
			name: 'Test Add-on',
			currencies: [{ currency: 'USD', unit_amount: 5 }],
		}

		createdAddOn = await service.createPlanAddOn(createdPlan.id as string, createData)

		expect(createdAddOn).toBeDefined()
		expect(createdAddOn?.code).toBe(createData.code)
		expect(createdAddOn?.name).toBe('Test Add-on')
		expect(createdAddOn?.state).toBe('active')
		expect(createdAddOn?.plan_id).toBe(createdPlan.id)
	})

	// READ - Get a specific plan add-on
	it('should get a specific plan add-on', async () => {
		const addOn = await service.getPlanAddOn(createdPlan.id as string, createdAddOn.id as string)

		expect(addOn).toBeDefined()
		expect(addOn.id).toBe(createdAddOn?.id)
		expect(addOn.code).toBe(createdAddOn?.code)
		expect(addOn.name).toBe(createdAddOn?.name)
		expect(addOn.plan_id).toBe(createdPlan?.id)
	})

	// READ - List plan add-ons
	it('should list plan add-ons', async () => {
		const response = await service.listPlanAddOns(createdPlan.id as string, {
			limit: 10,
			order: 'desc',
			sort: 'created_at',
		})

		expect(response).toBeDefined()
		expect(response.object).toBe('list')
		expect(Array.isArray(response.data)).toBe(true)

		// Check if our created add-on is in the list
		if (createdAddOn?.id) {
			const foundAddOn = response.data.find(a => a.id === createdAddOn?.id)
			expect(foundAddOn).toBeDefined()
		}
	})

	// UPDATE - Update a plan add-on
	it('should update a plan add-on', async () => {
		const updateData: RecurlyUpdatePlanAddOnDto = {
			name: 'Updated Test Add-on',
		}

		const updatedAddOn = await service.updatePlanAddOn(
			createdPlan.id as string,
			createdAddOn.id as string,
			updateData,
		)

		expect(updatedAddOn).toBeDefined()
		expect(updatedAddOn.id).toBe(createdAddOn?.id)
		expect(updatedAddOn.name).toBe('Updated Test Add-on')
	})

	// DELETE - Remove a plan add-on
	it('should remove a plan add-on', async () => {
		const removedAddOn = await service.removePlanAddOn(createdPlan.id as string, createdAddOn.id as string)

		expect(removedAddOn).toBeDefined()
		expect(removedAddOn.id).toBe(createdAddOn?.id)
		expect(removedAddOn.state).toBe('inactive')
	})

	afterAll(async () => {
		try {
			// Clean up test add-on if it exists
			if (createdAddOn?.id && createdPlan?.id) {
				await suppressErrorTesting(
					service,
					(plan_id: string, addon_id: string) => service.removePlanAddOn(plan_id, addon_id),
					createdPlan.id,
					createdAddOn.id,
				)
			}
		} catch {
			// Ignore cleanup errors
		}

		try {
			// Clean up test plan
			if (createdPlan?.id) {
				await suppressErrorTesting(planService, (id: string) => planService.removePlan(id), createdPlan.id)
			}
		} catch {
			// Ignore cleanup errors
		}
	})
})
