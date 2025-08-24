import { canTest, suppressErrorTesting } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { CouponCreateDto, CouponUpdateDto } from './coupon.dto'
import { CouponService } from './coupon.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('Coupon', () => {
	let service: CouponService
	let couponId: string

	beforeAll(async () => {
		if (!canTest()) return

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = module.get<CouponService>(CouponService)
	})

	describe('Coupon CRUD Operations', () => {
		it('should create a coupon', async () => {
			const createData: CouponCreateDto = {
				code: `TEST-${Date.now()}`,
				name: 'Test Coupon',
				discount_type: 'percent',
				discount_percent: 10,
				duration: 'forever',
			}

			const coupon = await service.createCoupon(createData)

			expect(coupon).toBeDefined()
			expect(coupon.id).toBeDefined()
			expect(coupon.code).toBe(createData.code.toLowerCase())
			expect(coupon.name).toBe(createData.name)
			expect(coupon.discount.type).toBe('percent')
			expect(coupon.discount.percent).toBe(10)

			couponId = coupon.id
		})

		it('should list coupons', async () => {
			const result = await service.listCoupons({ limit: 10 })

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
		})

		it('should get a coupon', async () => {
			const coupon = await service.getCoupon(couponId)

			expect(coupon).toBeDefined()
			expect(coupon.id).toBe(couponId)
		})

		it('should update a coupon', async () => {
			const updateData: CouponUpdateDto = {
				name: 'Updated Test Coupon',
				max_redemptions: 100,
			}

			const updatedCoupon = await service.updateCoupon(couponId, updateData)

			expect(updatedCoupon).toBeDefined()
			expect(updatedCoupon.name).toBe(updateData.name)
			expect(updatedCoupon.max_redemptions).toBe(updateData.max_redemptions)
		})

		it('should deactivate a coupon', async () => {
			const deactivatedCoupon = await service.deactivateCoupon(couponId)

			expect(deactivatedCoupon).toBeDefined()
			expect(deactivatedCoupon.state).toBe('expired')
		})

		it('should restore a coupon', async () => {
			const restoreData: CouponUpdateDto = {
				name: 'Restored Coupon',
			}

			const restoredCoupon = await service.restoreCoupon(couponId, restoreData)

			expect(restoredCoupon).toBeDefined()
			expect(restoredCoupon.state).toBe('redeemable')
			expect(restoredCoupon.name).toBe(restoreData.name)
		})
	})

	afterAll(async () => {
		try {
			// Clean up test plan
			if (couponId) {
				await suppressErrorTesting(service, (id: string) => service.deactivateCoupon(id), couponId)
			}
		} catch {
			// Ignore cleanup errors
		}
	})
})
