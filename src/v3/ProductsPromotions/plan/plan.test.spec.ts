import { canTest, suppressErrorTesting } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { RecurlyCreatePlanDto, RecurlyUpdatePlanDto } from './plan.dto'
import { PlanService } from './plan.service'
import { RecurlyPlan } from './plan.types'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

// Unique code to avoid conflicts with existing plans
const planCode = `test-plan-${Date.now()}`

describe('PlanService', () => {
	let service: PlanService
	let createdPlan: RecurlyPlan

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<PlanService>(PlanService)
	})

	describe('Plan CRUD Operations', () => {
		// CREATE
		it('should create a plan', async () => {
			if (!canTest()) return

			const createDto: RecurlyCreatePlanDto = {
				code: planCode,
				name: 'Test Plan',
				currencies: [
					{
						currency: 'USD',
						unit_amount: 99.99,
					},
				],
				interval_unit: 'months',
				interval_length: 1,
				description: 'This is a test plan',
				trial_length: 7,
				trial_unit: 'days',
				auto_renew: true,
			}

			createdPlan = await service.createPlan(createDto)

			expect(createdPlan).toBeDefined()
			expect(createdPlan.code).toBe(createDto.code)
			expect(createdPlan.name).toBe(createDto.name)
			expect(createdPlan.description).toBe(createDto.description)
			expect(createdPlan.interval_unit).toBe(createDto.interval_unit)
			expect(createdPlan.interval_length).toBe(createDto.interval_length)
			expect(createdPlan.trial_length).toBe(createDto.trial_length)
			expect(createdPlan.trial_unit).toBe(createDto.trial_unit)
			expect(createdPlan.auto_renew).toBe(createDto.auto_renew)
			expect(createdPlan.state).toBe('active')
			expect(createdPlan.id).toBeDefined()
		})

		// READ - Get single plan
		it('should get a plan by ID', async () => {
			if (!canTest()) return

			const plan = await service.getPlan(createdPlan.id!)

			expect(plan).toBeDefined()
			expect(plan.id).toBe(createdPlan.id)
			expect(plan.code).toBe(createdPlan.code)
			expect(plan.name).toBe(createdPlan.name)
			expect(plan.state).toBe('active')
		})

		// READ - List plans
		it('should list plans', async () => {
			if (!canTest()) return

			const response = await service.listPlans({
				limit: 10,
				order: 'desc',
				sort: 'created_at',
			})

			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)

			// Check if our created plan is in the list
			const foundPlan = response.data.find(plan => plan.id === createdPlan.id)
			expect(foundPlan).toBeDefined()
		})

		// UPDATE
		it('should update a plan', async () => {
			if (!canTest()) return

			const updateDto: RecurlyUpdatePlanDto = {
				name: 'Updated Test Plan',
				description: 'This is an updated test plan',
				trial_length: 14,
				currencies: [
					{
						currency: 'USD',
						unit_amount: 149.99,
					},
				],
			}

			const updatedPlan = await service.updatePlan(createdPlan.id!, updateDto)

			expect(updatedPlan).toBeDefined()
			expect(updatedPlan.id).toBe(createdPlan.id)
			expect(updatedPlan.name).toBe(updateDto.name)
			expect(updatedPlan.description).toBe(updateDto.description)
			expect(updatedPlan.trial_length).toBe(updateDto.trial_length)

			// Verify the update by getting the plan again
			const verifiedPlan = await service.getPlan(createdPlan.id!)
			expect(verifiedPlan.name).toBe(updateDto.name)
			expect(verifiedPlan.description).toBe(updateDto.description)
			expect(verifiedPlan.trial_length).toBe(updateDto.trial_length)
		})

		// DELETE (Remove)
		it('should remove a plan', async () => {
			if (!canTest()) return

			const removedPlan = await service.removePlan(createdPlan.id!)

			expect(removedPlan).toBeDefined()
			expect(removedPlan.id).toBe(createdPlan.id)
			expect(removedPlan.state).toBe('inactive')

			// Verify the removal by getting the plan again
			const verifiedPlan = await service.getPlan(createdPlan.id!)
			expect(verifiedPlan.state).toBe('inactive')
		})
	})

	// Cleanup is not needed as removed plans are already inactive
	afterAll(async () => {
		if (createdPlan && createdPlan.id) {
			try {
				await suppressErrorTesting(service, (id: string) => service.removePlan(id), createdPlan.id)
			} catch {
				// Item might already be deactivated, ignore error
			}
		}
	})
})
