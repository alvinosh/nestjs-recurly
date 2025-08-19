import { r } from '@faker-js/faker/dist/airline-CLphikKp'
import { canTest, suppressErrorTesting } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { AccountsService } from '../accounts.service'
import { RecurlyAccountShippingAddressCreateDto, RecurlyAccountShippingAddressUpdateDto } from './shippingAddress.dto'
import { ShippingAddressService } from './shippingAddress.service'
import { RecurlyShippingAddress } from './shippingAddress.types'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('ShippingAddressService', () => {
	let service: ShippingAddressService
	let accountsService: AccountsService
	let testAccountId: string
	let createdShippingAddressId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping tests in production environment')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<ShippingAddressService>(ShippingAddressService)
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

	describe('CRUD Operations', () => {
		let shippingAddress: RecurlyShippingAddress

		// CREATE
		it('should create a shipping address', async () => {
			const createDto: RecurlyAccountShippingAddressCreateDto = {
				nickname: 'Test Address',
				first_name: 'Test',
				last_name: 'User',
				company: 'Test Company',
				email: 'test@example.com',
				phone: '555-1234',
				street1: '123 Test Street',
				street2: 'Suite 100',
				city: 'Test City',
				region: 'TS',
				postal_code: '12345',
				country: 'US',
			}

			shippingAddress = await service.createShippingAddress(testAccountId, createDto)
			createdShippingAddressId = shippingAddress.id!

			expect(shippingAddress).toBeDefined()
			expect(shippingAddress.id).toBeDefined()
			expect(shippingAddress.first_name).toBe(createDto.first_name)
			expect(shippingAddress.last_name).toBe(createDto.last_name)
			expect(shippingAddress.street1).toBe(createDto.street1)
			expect(shippingAddress.city).toBe(createDto.city)
			expect(shippingAddress.postal_code).toBe(createDto.postal_code)
			expect(shippingAddress.country).toBe(createDto.country)
		})

		// READ (List)
		it('should list shipping addresses', async () => {
			const result = await service.listShippingAddresses(testAccountId)

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(result.data).toBeDefined()
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data!.length).toBeGreaterThan(0)

			const foundAddress = result.data!.find(addr => addr.id === createdShippingAddressId)
			expect(foundAddress).toBeDefined()
		})

		// READ (Single)
		it('should get a specific shipping address', async () => {
			const result = await service.getShippingAddress(testAccountId, createdShippingAddressId)

			expect(result).toBeDefined()
			expect(result.id).toBe(createdShippingAddressId)
			expect(result.first_name).toBe(shippingAddress.first_name)
			expect(result.last_name).toBe(shippingAddress.last_name)
			expect(result.street1).toBe(shippingAddress.street1)
		})

		// UPDATE
		it('should update a shipping address', async () => {
			const updateDto: RecurlyAccountShippingAddressUpdateDto = {
				nickname: 'Updated Test Address',
				street2: 'Apt 200',
				phone: '555-5678',
			}

			const updatedAddress = await service.updateShippingAddress(
				testAccountId,
				createdShippingAddressId,
				updateDto,
			)

			expect(updatedAddress).toBeDefined()
			expect(updatedAddress.id).toBe(createdShippingAddressId)
			expect(updatedAddress.nickname).toBe(updateDto.nickname)
			expect(updatedAddress.street2).toBe(updateDto.street2)
			expect(updatedAddress.phone).toBe(updateDto.phone)

			// Verify the update by fetching the address again
			const verifyAddress = await service.getShippingAddress(testAccountId, createdShippingAddressId)
			expect(verifyAddress.nickname).toBe(updateDto.nickname)
			expect(verifyAddress.street2).toBe(updateDto.street2)
			expect(verifyAddress.phone).toBe(updateDto.phone)
		})

		// DELETE
		it('should remove a shipping address', async () => {
			await expect(
				service.removeShippingAddress(testAccountId, createdShippingAddressId),
			).resolves.toBeUndefined()

			// Verify deletion by trying to get the address (should throw an error)
		    await suppressErrorTesting(
				service,
				(id: string, address_id: string) => service.getShippingAddress(id, address_id),
				testAccountId,
				createdShippingAddressId,
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
