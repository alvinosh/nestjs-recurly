import { AccountsService } from '../accounts/accounts.service'
import { RecurlyAccount } from '../accounts/accounts.types'
import { canTest, suppressErrorTesting } from '../v3.helpers'
import { RecurlyV3Module } from '../v3.module'
import { RecurlyCreateGiftCardDto, RecurlyRedeemGiftCardDto } from './giftCards.dto'
import { GiftCardService } from './giftCards.service'
import { RecurlyGiftCard } from './giftCards.types'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

// Unique identifiers to avoid conflicts
const gifterAccountCode = `test-gifter-${Date.now()}`
const recipientAccountCode = `test-recipient-${Date.now()}`

describe.skip('Gift Card', () => {
	let service: GiftCardService
	let accountsService: AccountsService
	let gifterAccount: RecurlyAccount
	let recipientAccount: RecurlyAccount
	let createdGiftCard: RecurlyGiftCard

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<GiftCardService>(GiftCardService)
		accountsService = moduleRef.get<AccountsService>(AccountsService)

		// Create test gifter account
		gifterAccount = await accountsService.createAccount({
			code: gifterAccountCode,
			email: `${gifterAccountCode}@test.com`,
			first_name: 'Test',
			last_name: 'Gifter',
			billing_info: {
				first_name: 'Test',
				last_name: 'Gifter',
				number: '4111111111111111',
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
			},
		})

		// Create test recipient account
		recipientAccount = await accountsService.createAccount({
			code: recipientAccountCode,
			email: `${recipientAccountCode}@test.com`,
			first_name: 'Test',
			last_name: 'Recipient',
		})
	})

	describe('Gift Card CRUD Operations', () => {
		// CREATE
		it('should create a gift card', async () => {

			const createDto: RecurlyCreateGiftCardDto = {
				product_code: 'gift_card',
				unit_amount: 50.0,
				currency: 'USD',
				delivery: {
					method: 'email',
					email_address: recipientAccount.email,
					first_name: recipientAccount.first_name,
					last_name: recipientAccount.last_name,
					gifter_name: `${gifterAccount.first_name} ${gifterAccount.last_name}`,
					personal_message: 'Happy Birthday! Enjoy your gift.',
				},
				gifter_account: {
					code: gifterAccount.code,
				},
			}

			createdGiftCard = await service.createGiftCard(createDto)

			expect(createdGiftCard).toBeDefined()
			expect(createdGiftCard.product_code).toBe(createDto.product_code)
			expect(createdGiftCard.unit_amount).toBe(createDto.unit_amount)
			expect(createdGiftCard.currency).toBe(createDto.currency)
			expect(createdGiftCard.gifter_account_id).toBe(gifterAccount.id)
			expect(createdGiftCard.redemption_code).toBeDefined()
			expect(createdGiftCard.id).toBeDefined()
			expect(createdGiftCard.delivery?.method).toBe('email')
			expect(createdGiftCard.delivery?.email_address).toBe(recipientAccount.email)
		})

		// READ - Get single gift card
		it('should get a gift card by ID', async () => {

			const giftCard = await service.getGiftCard(createdGiftCard.id!)

			expect(giftCard).toBeDefined()
			expect(giftCard.id).toBe(createdGiftCard.id)
			expect(giftCard.product_code).toBe(createdGiftCard.product_code)
			expect(giftCard.unit_amount).toBe(createdGiftCard.unit_amount)
			expect(giftCard.redemption_code).toBe(createdGiftCard.redemption_code)
		})

		// READ - List gift cards
		it('should list gift cards', async () => {

			const response = await service.listGiftCards({
				limit: 10,
				order: 'desc',
				sort: 'created_at',
			})

			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)

			// Check if our created gift card is in the list
			const foundGiftCard = response.data.find(gc => gc.id === createdGiftCard.id)
			expect(foundGiftCard).toBeDefined()
		})

		// PREVIEW
		it('should preview a gift card', async () => {

			const previewDto: RecurlyCreateGiftCardDto = {
				product_code: 'gift_card',
				unit_amount: 100.0,
				currency: 'USD',
				delivery: {
					method: 'email',
					email_address: 'preview@example.com',
					first_name: 'Preview',
					last_name: 'User',
					gifter_name: 'Test Gifter',
					personal_message: 'This is a preview',
				},
				gifter_account: {
					code: gifterAccount.code,
				},
			}

			const preview = await service.previewGiftCard(previewDto)

			expect(preview).toBeDefined()
			expect(preview.product_code).toBe(previewDto.product_code)
			expect(preview.unit_amount).toBe(previewDto.unit_amount)
			expect(preview.currency).toBe(previewDto.currency)
			// Preview should not have an ID or redemption code
			expect(preview.id).toBeUndefined()
			expect(preview.redemption_code).toBeUndefined()
		})

		// REDEEM
		it('should redeem a gift card', async () => {

			const redeemDto: RecurlyRedeemGiftCardDto = {
				recipient_account: {
					code: recipientAccount.code,
				},
			}

			const redeemedGiftCard = await service.redeemGiftCard(createdGiftCard.redemption_code!, redeemDto)

			expect(redeemedGiftCard).toBeDefined()
			expect(redeemedGiftCard.id).toBe(createdGiftCard.id)
			expect(redeemedGiftCard.recipient_account_id).toBe(recipientAccount.id)
			expect(redeemedGiftCard.redeemed_at).toBeDefined()
			expect(redeemedGiftCard.balance).toBeDefined()
		})

		// READ after REDEEM - Verify redemption
		it('should verify gift card redemption', async () => {

			const giftCard = await service.getGiftCard(createdGiftCard.id!)

			expect(giftCard).toBeDefined()
			expect(giftCard.recipient_account_id).toBe(recipientAccount.id)
			expect(giftCard.redeemed_at).toBeDefined()
			expect(giftCard.balance).toBe(createdGiftCard.unit_amount)
		})
	})

	afterAll(async () => {

		// Clean up accounts
		if (gifterAccount?.id) {
			await suppressErrorTesting(
				accountsService,
				(id: string) => accountsService.deactivateAccount(id),
				gifterAccount.id,
			)
		}

		if (recipientAccount?.id) {
			await suppressErrorTesting(
				accountsService,
				(id: string) => accountsService.deactivateAccount(id),
				recipientAccount.id,
			)
		}
	})
})
