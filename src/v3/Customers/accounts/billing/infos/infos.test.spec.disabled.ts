import { canTest, suppressErrorTesting } from '../../../../v3.helpers'
import { RecurlyV3Module } from '../../../../v3.module'
import { AccountsService } from '../../accounts.service'
import { RecurlyCreateBillingInfoDto, RecurlyUpdateBillingInfoDto, RecurlyVerifyBillingInfoCVVDto } from './infos.dto'
import { BillingInfosService } from './infos.service'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Billing Infos', () => {
	let service: BillingInfosService
	let accountsService: AccountsService
	let testAccountId: string
	let testBillingInfoId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.warn('Skipping BillingInfos tests due to configuration or environment issues.')
			return
		}

		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<BillingInfosService>(BillingInfosService)
		accountsService = moduleRef.get<AccountsService>(AccountsService)

		// Create a test account for the acquisition tests
		const testAccount = await accountsService.createAccount({
			code: faker.string.alpha(49),
			email: faker.internet.email(),
			first_name: 'Test',
			last_name: 'Acquisition',
		})
		testAccountId = testAccount.id!
		testBillingInfoId = `test-billing-${Date.now()}`
	})

	describe('Create', () => {
		it('should create a billing info', async () => {
			const createDto: RecurlyCreateBillingInfoDto = {
				first_name: 'John',
				last_name: 'Doe',
				number: '4111111111111111',
				month: '12',
				year: '2025',
				cvv: '123',
				primary_payment_method: true,
			}

			const result = await service.createBillingInfo(testAccountId, createDto)

			expect(result).toBeDefined()
			expect(result.first_name).toBe('John')
			expect(result.last_name).toBe('Doe')
			expect(result.primary_payment_method).toBe(true)
			result.id = testBillingInfoId // Set the ID for later tests
		})
	})

	describe('Read', () => {
		it('should list billing infos', async () => {
			const result = await service.listBillingInfos(testAccountId)
			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(result.data).toHaveLength(1)
			expect(result.data![0].id).toBe(testBillingInfoId)
		})

		it('should get a specific billing info', async () => {
			const result = await service.getBillingInfo(testAccountId, testBillingInfoId)
			expect(result).toBeDefined()
			expect(result.id).toBe(testBillingInfoId)
			expect(result.first_name).toBe('John')
			expect(result.last_name).toBe('Doe')
		})
	})

	describe('Update', () => {
		it('should update a billing info', async () => {
			const updateDto: RecurlyUpdateBillingInfoDto = {
				first_name: 'Jane',
				last_name: 'Smith',
			}

			const result = await service.updateBillingInfo(testAccountId, testBillingInfoId, updateDto)

			expect(result).toBeDefined()
			expect(result.id).toBe(testBillingInfoId)
			expect(result.first_name).toBe('Jane')
			expect(result.last_name).toBe('Smith')
		})

		it('should verify the updated billing info exists', async () => {
			const result = await service.getBillingInfo(testAccountId, testBillingInfoId)

			expect(result).toBeDefined()
			expect(result.first_name).toBe('Jane')
			expect(result.last_name).toBe('Smith')
		})
	})

	describe('Verify', () => {
		it('should verify a billing info', async () => {
			const result = await service.verifyBillingInfo(testAccountId, testBillingInfoId)
			expect(result).toBeDefined()
			expect(result.status).toBe('success')
			expect(result.success).toBe(true)
		})

		it('should verify billing info CVV', async () => {
			const verifyDto: RecurlyVerifyBillingInfoCVVDto = {
				verification_value: '123',
			}

			const result = await service.verifyBillingInfoCVV(testAccountId, testBillingInfoId, verifyDto)

			expect(result).toBeDefined()
			expect(result.status).toBe('success')
			expect(result.success).toBe(true)
			expect(result.cvv_check).toBe('pass')
		})
	})

	describe('Delete', () => {
		it('should remove a billing info', async () => {
			await expect(service.removeBillingInfo(testAccountId, testBillingInfoId)).resolves.not.toThrow()
		})

		it('should verify the billing info was deleted', async () => {
			await suppressErrorTesting(
				service,
				(accountId: string, billingInfoId: string) => service.getBillingInfo(accountId, billingInfoId),
				testAccountId,
				testBillingInfoId,
			)
		})
	})

	afterAll(async () => {
		try {
			await suppressErrorTesting(
				accountsService,
				(id: string) => accountsService.deactivateAccount(id),
				testAccountId,
			)
		} catch {
			// Ignore errors during cleanup
		}
	})
})
