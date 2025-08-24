import { CouponCreateDto } from '../../../ProductsPromotions/coupon/coupon.dto'
import { CouponService } from '../../../ProductsPromotions/coupon/coupon.service'
import { canTest, suppressErrorTesting } from '../../../v3.helpers'
import { RecurlyV3Module } from '../../../v3.module'
import { AccountsService } from '../accounts.service'
import { RecurlyCouponRedemptionCreateDto } from './couponRedemption.dto'
import { CouponRedemptionService } from './couponRedemption.service'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('Coupon Redemption', () => {
	let service: CouponRedemptionService
	let couponService: CouponService
	let accountsService: AccountsService
	let testAccountId: string
	let couponId: string

	beforeAll(async () => {
		if (!canTest()) {
			return
		}

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = module.get<CouponRedemptionService>(CouponRedemptionService)
		couponService = module.get<CouponService>(CouponService)
		accountsService = module.get<AccountsService>(AccountsService)

		// Create a test account for the acquisition tests
		const testAccount = await accountsService.createAccount({
			code: faker.string.alpha(49),
			email: faker.internet.email(),
			first_name: 'Test',
			last_name: 'Coupon Redemption',
		})

		testAccountId = testAccount.id!

		// Create test coupon
		const couponData: CouponCreateDto = {
			code: `TEST-COUPON-${Date.now()}`,
			name: 'Test Coupon for Redemption',
			discount_type: 'percent',
			discount_percent: 10,
			duration: 'forever',
		}
		const coupon = await couponService.createCoupon(couponData)
		couponId = coupon.id
	})

	describe('Coupon Redemption CRUD Operations', () => {
		it('should create a coupon redemption', async () => {
			const redemptionData: RecurlyCouponRedemptionCreateDto = {
				coupon_id: couponId,
				currency: 'USD',
			}

			const redemption = await service.createCouponRedemption(testAccountId, redemptionData)

			expect(redemption).toBeDefined()
			expect(redemption.id).toBeDefined()
			expect(redemption.state).toBe('active')
			expect(redemption.coupon).toBeDefined()
			expect(redemption.coupon.id).toBe(couponId)
		})

		it('should list account coupon redemptions', async () => {
			// First create a redemption
			const redemptionData: RecurlyCouponRedemptionCreateDto = {
				coupon_id: couponId,
				currency: 'USD',
			}
			await service.createCouponRedemption(testAccountId, redemptionData)

			// List redemptions
			const result = await service.listAccountCouponRedemptions(testAccountId, { limit: 10 })

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data.length).toBeGreaterThan(0)
		})

		it('should list active coupon redemptions', async () => {
			// First create a redemption
			const redemptionData: RecurlyCouponRedemptionCreateDto = {
				coupon_id: couponId,
				currency: 'USD',
			}
			await service.createCouponRedemption(testAccountId, redemptionData)

			// List active redemptions
			const result = await service.listActiveCouponRedemptions(testAccountId)

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data.length).toBeGreaterThan(0)
			expect(result.data.every(r => r.state === 'active')).toBe(true)
		})

		it('should remove a coupon redemption', async () => {
			// First create a redemption
			const redemptionData: RecurlyCouponRedemptionCreateDto = {
				coupon_id: couponId,
				currency: 'USD',
			}
			await service.createCouponRedemption(testAccountId, redemptionData)

			// Remove the redemption
			const removedRedemption = await service.removeCouponRedemption(testAccountId)

			expect(removedRedemption).toBeDefined()
			expect(removedRedemption.id).toBeDefined()

			// Verify it's removed by checking active redemptions
			await suppressErrorTesting(service, (id: string) => service.listActiveCouponRedemptions(id), testAccountId)
		})

		//// Note: Invoice coupon redemptions require a invoice to be created first (we need to implement invoices for this test first)
		it.skip('should list invoice coupon redemptions', async () => {})

		// Note: Subscription coupon redemptions require a subscription to be created first (we need to implement subscriptions for this test first)
		it.skip('should list subscription coupon redemptions', async () => {})
	})

	// Cleanup: Remove test data
	afterAll(async () => {
		if (!canTest()) return

		// Try to remove coupon redemption first
		if (testAccountId) {
			await suppressErrorTesting(service, (id: string) => service.removeCouponRedemption(id), testAccountId)
		}

		// Deactivate coupon
		if (couponId) {
			await suppressErrorTesting(couponService, (id: string) => couponService.deactivateCoupon(id), couponId)
		}

		// Deactivate account
		if (testAccountId) {
			await suppressErrorTesting(
				accountsService,
				(id: string) => accountsService.deactivateAccount(id),
				testAccountId,
			)
		}
	})
})
