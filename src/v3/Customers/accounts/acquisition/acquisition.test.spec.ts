import { canTest, suppressErrorTesting } from '../../../v3.helpers'
import { RecurlyV3Module } from '../../../v3.module'
import { AccountsService } from '../accounts.service'
import { AccountAcquisitionService } from './acquisition.service'
import { RecurlyAccountAcquisitionChannel } from './acquisition.types'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('Account Acquisition', () => {
	let service: AccountAcquisitionService
	let accountsService: AccountsService
	let testAccountId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.warn('Skipping Account Acquisition tests due to configuration or environment issues.')
			return
		}

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = module.get<AccountAcquisitionService>(AccountAcquisitionService)
		accountsService = module.get<AccountsService>(AccountsService)

		// Create a test account for the acquisition tests
		const testAccount = await accountsService.createAccount({
			code: faker.string.alpha(49),
			email: faker.internet.email(),
			first_name: 'Test',
			last_name: 'Acquisition',
		})
		testAccountId = testAccount.id!
	})

	describe('updateAccountAcquisition', () => {
		it('should update account acquisition data', async () => {
			if (!canTest()) return
			const acquisitionData = {
				campaign: 'test-campaign',
				channel: RecurlyAccountAcquisitionChannel.SOCIAL_MEDIA,
				subchannel: 'twitter',
				cost: {
					currency: 'USD',
					amount: 50.0,
				},
			}

			const result = await service.updateAccountAcquisition(testAccountId, acquisitionData)

			expect(result).toBeDefined()
			expect(result.campaign).toBe(acquisitionData.campaign)
			expect(result.channel).toBe(acquisitionData.channel)
			expect(result.subchannel).toBe(acquisitionData.subchannel)
			expect(result.cost?.currency).toBe(acquisitionData.cost.currency)
			expect(result.cost?.amount).toBe(acquisitionData.cost.amount)
		})
	})

	describe('getAccountAcquisition', () => {
		it('should retrieve account acquisition data', async () => {
			if (!canTest()) return
			const result = await service.getAccountAcquisition(testAccountId)

			expect(result).toBeDefined()
			expect(result.campaign).toBe('test-campaign')
			expect(result.channel).toBe(RecurlyAccountAcquisitionChannel.SOCIAL_MEDIA)
			expect(result.subchannel).toBe('twitter')
		})
	})

	describe('listAccountAcquisition', () => {
		it('should list site account acquisition data', async () => {
			if (!canTest()) return
			const result = await service.listAccountAcquisition({ limit: 10 })

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(result.data).toBeDefined()
			expect(Array.isArray(result.data)).toBe(true)
		})

		it('should list site account acquisition data with filters', async () => {
			if (!canTest()) return
			const result = await service.listAccountAcquisition({
				limit: 5,
				order: 'desc',
				sort: 'created_at',
			})

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(result.data).toBeDefined()
			expect(Array.isArray(result.data)).toBe(true)
		})
	})

	describe('removeAccountAcquisition', () => {
		it('should remove account acquisition data', async () => {
			if (!canTest()) return

			// Remove the acquisition data
			await expect(service.removeAccountAcquisition(testAccountId)).resolves.not.toThrow()

			await suppressErrorTesting(
				service,
				(accountId: string) => service.getAccountAcquisition(accountId),
				testAccountId,
			)
		})
	})

	afterAll(async () => {
		// Clean up test account
		if (testAccountId) {
			try {
				await suppressErrorTesting(
					accountsService,
					(id: string) => accountsService.deactivateAccount(id),
					testAccountId,
				)
			} catch {
				// Account might already be deactivated
			}
		}
	})
})
