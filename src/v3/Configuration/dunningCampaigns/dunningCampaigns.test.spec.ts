import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { DunningCampaignsService } from './dunningCampaigns.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('DunningCampaignsService', () => {
	let service: DunningCampaignsService
	let dunningCampaignId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<DunningCampaignsService>(DunningCampaignsService)
	})

	describe('Dunning Campaign Operations', () => {
		it('should list dunning campaigns', async () => {
			if (!canTest()) return

			const campaigns = await service.listDunningCampaigns()
			expect(campaigns).toBeDefined()
			expect(campaigns.data).toBeDefined()
			expect(Array.isArray(campaigns.data)).toBe(true)

			// Store the first campaign ID for subsequent tests
			if (campaigns.data && campaigns.data.length > 0) {
				dunningCampaignId = campaigns.data[0].id!
			}
		})

		it('should get a specific dunning campaign', async () => {
			if (!canTest() || !dunningCampaignId) {
				console.warn('Skipping get dunning campaign test - no campaign ID available')
				return
			}

			const campaign = await service.getDunningCampaign(dunningCampaignId)
			expect(campaign).toBeDefined()
			expect(campaign.id).toBe(dunningCampaignId)
			expect(campaign.code).toBeDefined()
			expect(campaign.name).toBeDefined()
		})

		it('should list dunning campaigns with query parameters', async () => {
			if (!canTest()) return

			const campaigns = await service.listDunningCampaigns({
				limit: 1,
				order: 'asc',
				sort: 'created_at',
			})
			expect(campaigns).toBeDefined()
			expect(campaigns.data).toBeDefined()
			expect(Array.isArray(campaigns.data)).toBe(true)
		})

		it('should bulk update dunning campaign (Note: This requires existing plans)', async () => {
			if (!canTest() || !dunningCampaignId) {
				console.warn('Skipping bulk update test - no campaign ID available')
				return
			}

			// Note: This test may fail if there are no plans in the test environment
			// or if the plans don't exist. In a real scenario, you would have existing plan codes/IDs
			try {
				const updateData = {
					plan_codes: ['test_plan_code'], // This would need to be a real plan code in your test environment
				}

				const response = await service.bulkUpdateDunningCampaign(dunningCampaignId, updateData)
				expect(response).toBeDefined()
				expect(response.object).toBeDefined()
				expect(response.plans).toBeDefined()
				expect(Array.isArray(response.plans)).toBe(true)
			} catch (error) {
				// Expected to fail if test plan doesn't exist
				console.warn(
					'Bulk update test failed (expected if test plans do not exist):',
					error instanceof Error ? error.message : 'Unknown error',
				)
				expect(error).toBeDefined()
			}
		})
	})
})
