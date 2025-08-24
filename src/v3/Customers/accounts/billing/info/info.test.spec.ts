import { canTest, suppressErrorTesting } from '../../../../v3.helpers'
import { RecurlyV3Module } from '../../../../v3.module'
import { AccountsService } from '../../accounts.service'
import { RecurlyUpdateBillingInfoDto, RecurlyVerifyBillingInfoDto, RecurlyVerifyBillingInfoCvvDto } from './info.dto'
import { BillingInfoService } from './info.service'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

describe('Billing Info', () => {
	let service: BillingInfoService
	let accountsService: AccountsService
	let testAccountId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping tests in production environment')
			return
		}

		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<BillingInfoService>(BillingInfoService)
		accountsService = moduleRef.get<AccountsService>(AccountsService)

		// Create a test account for the acquisition tests
		const testAccount = await accountsService.createAccount({
			code: faker.string.alpha(49),
			email: faker.internet.email(),
			first_name: 'Test',
			last_name: 'Acquisition',
		})
		testAccountId = testAccount.id!
	})

	describe('updateBillingInfo', () => {
		it('should create/update billing information for an account', async () => {
			if (!canTest()) return

			const billingInfo: RecurlyUpdateBillingInfoDto = {
				first_name: 'Test',
				last_name: 'User',
				number: '4111111111111111', // Test card number
				month: '12',
				year: '2030',
				cvv: '123',
				address: {
					street1: '123 Test Street',
					city: 'Test City',
					region: 'CA',
					postal_code: '12345',
					country: 'US',
				},
			}

			const result = await service.updateBillingInfo(testAccountId, billingInfo)

			expect(result).toBeDefined()
			expect(result.first_name).toBe(billingInfo.first_name)
			expect(result.last_name).toBe(billingInfo.last_name)
			expect(result.payment_method?.last_four).toBe('1111')
		})
	})

	describe('getBillingInfo', () => {
		it('should fetch billing information for an account', async () => {
			if (!canTest()) return

			const result = await service.getBillingInfo(testAccountId)

			expect(result).toBeDefined()
			expect(result.account_id).toBeDefined()
			expect(result.payment_method).toBeDefined()
		})
	})

	describe('verifyBillingInfo', () => {
		it('should verify billing information', async () => {
			if (!canTest()) return

			const verifyData: RecurlyVerifyBillingInfoDto = {}

			const result = await service.verifyBillingInfo(testAccountId, verifyData)

			expect(result).toBeDefined()
			expect(result.type).toBe('verify')
			expect(result.status).toBeDefined()
		})
	})

	describe('verifyBillingInfoCvv', () => {
		it('should verify billing information CVV', async () => {
			if (!canTest()) return

			const verifyData: RecurlyVerifyBillingInfoCvvDto = {
				verification_value: '123',
			}

			const result = await service.verifyBillingInfoCvv(testAccountId, verifyData)

			expect(result).toBeDefined()
			expect(result.type).toBe('verify')
			expect(result.cvv_check).toBeDefined()
		})
	})

	describe('removeBillingInfo', () => {
		it('should remove billing information from an account', async () => {
			if (!canTest()) return

			// First ensure billing info exists
			const billingInfo: RecurlyUpdateBillingInfoDto = {
				first_name: 'Delete',
				last_name: 'Test',
				number: '4111111111111111',
				month: '12',
				year: '2030',
				cvv: '123',
			}

			await service.updateBillingInfo(testAccountId, billingInfo)

			// Now remove it
			await expect(service.removeBillingInfo(testAccountId)).resolves.not.toThrow()

			// Verify it's gone
			await suppressErrorTesting(service, (accountId: string) => service.getBillingInfo(accountId), testAccountId)
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
