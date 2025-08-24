import { canTest, suppressErrorTesting } from '../../../v3.helpers'
import { RecurlyV3Module } from '../../../v3.module'
import { CouponService } from '../coupon.service'
import { RecurlyCoupon } from '../coupon.types'
import { RecurlyGenerateUniqueCouponCodesDto, RecurlyListUniqueCouponCodesDto } from './unique.dto'
import { UniqueCouponCodeService } from './unique.service'
import { RecurlyUniqueCouponCode, RecurlyUniqueCouponCodeParams } from './unique.types'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe.skip('Unique Coupon Code - TODO: Decide how to handle the wait between generating and listing the codes', () => {
	let service: UniqueCouponCodeService
	let couponService: CouponService
	let module: TestingModule
	let createdCoupon: RecurlyCoupon
	let generatedCodesParams: RecurlyUniqueCouponCodeParams
	let uniqueCouponCode: RecurlyUniqueCouponCode

	beforeAll(async () => {
		if (!canTest()) return

		module = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = module.get<UniqueCouponCodeService>(UniqueCouponCodeService)
		couponService = module.get<CouponService>(CouponService)

		// First, let's check if there's an existing bulk coupon we can use
		const coupons = await couponService.listCoupons({ limit: 100 })
		const existingBulkCoupon = coupons.data.find(c => c.coupon_type === 'bulk' && c.state === 'redeemable')

		if (existingBulkCoupon) {
			createdCoupon = existingBulkCoupon
		} else {
			// Create a test bulk coupon with a simple template
			const couponCode = `${Date.now()}`
			createdCoupon = await couponService.createCoupon({
				code: couponCode,
				name: 'Test Bulk Coupon for Unique Codes',
				discount_type: 'percent',
				discount_percent: 10,
				duration: 'forever',
				coupon_type: 'bulk',
				unique_code_template: `'${couponCode}-9999'`,
				max_redemptions: 100,
			})
		}

		expect(createdCoupon).toBeDefined()
		expect(createdCoupon.id).toBeDefined()
		expect(createdCoupon.coupon_type).toBe('bulk')
	})

	// CREATE - Generate unique coupon codes
	it('should generate unique coupon codes', async () => {
		const generateData: RecurlyGenerateUniqueCouponCodesDto = {
			number_of_unique_codes: 5,
		}

		generatedCodesParams = await service.generateUniqueCouponCodes(createdCoupon.id, generateData)

		console.log('Generated Codes Params:', generatedCodesParams)

		expect(generatedCodesParams).toBeDefined()
		expect(generatedCodesParams.limit).toBe(5)
		expect(generatedCodesParams.begin_time).toBeDefined()
	})

	// READ - List unique coupon codes
	it('should list unique coupon codes', async () => {
		const listParams: RecurlyListUniqueCouponCodesDto = {
			limit: 10,
			order: 'asc',
			sort: 'created_at',
		}

		const response = await service.listUniqueCouponCodes(createdCoupon.id, listParams)

		expect(response).toBeDefined()
		expect(response.object).toBe('list')
		expect(Array.isArray(response.data)).toBe(true)
		expect(response.data.length).toBeGreaterThan(0)

		// Save one unique coupon code for further tests
		uniqueCouponCode = response.data[0]
		expect(uniqueCouponCode).toBeDefined()
		expect(uniqueCouponCode.id).toBeDefined()
		expect(uniqueCouponCode.code).toBeTruthy()
		expect(uniqueCouponCode.state).toBe('redeemable')
	})

	// READ - Get a specific unique coupon code
	it('should get a specific unique coupon code', async () => {
		const code = await service.getUniqueCouponCode(uniqueCouponCode.id as string)

		expect(code).toBeDefined()
		expect(code.id).toBe(uniqueCouponCode.id)
		expect(code.code).toBe(uniqueCouponCode.code)
		expect(code.bulk_coupon_id).toBe(createdCoupon.id)
		expect(code.state).toBe('redeemable')
	})

	// UPDATE - Deactivate a unique coupon code
	it('should deactivate a unique coupon code', async () => {
		const deactivatedCode = await service.deactivateUniqueCouponCode(uniqueCouponCode.id as string)

		expect(deactivatedCode).toBeDefined()
		expect(deactivatedCode.id).toBe(uniqueCouponCode.id)
		expect(deactivatedCode.state).toBe('inactive')
	})

	// READ - Verify deactivation
	it('should verify unique coupon code is deactivated', async () => {
		const code = await service.getUniqueCouponCode(uniqueCouponCode.id as string)

		expect(code).toBeDefined()
		expect(code.state).toBe('inactive')
	})

	// UPDATE - Reactivate a unique coupon code
	it('should reactivate a unique coupon code', async () => {
		const reactivatedCode = await service.reactivateUniqueCouponCode(uniqueCouponCode.id as string)

		expect(reactivatedCode).toBeDefined()
		expect(reactivatedCode.id).toBe(uniqueCouponCode.id)
		expect(reactivatedCode.state).toBe('redeemable')
	})

	// READ - Verify reactivation
	it('should verify unique coupon code is reactivated', async () => {
		const code = await service.getUniqueCouponCode(uniqueCouponCode.id as string)

		expect(code).toBeDefined()
		expect(code.state).toBe('redeemable')
	})

	// READ - List unique coupon codes with filter
	it('should list unique coupon codes filtered by redeemed status', async () => {
		const listParams: RecurlyListUniqueCouponCodesDto = {
			redeemed: 'false',
			limit: 10,
		}

		const response = await service.listUniqueCouponCodes(createdCoupon.id, listParams)

		expect(response).toBeDefined()
		expect(response.object).toBe('list')
		expect(Array.isArray(response.data)).toBe(true)
		// All returned codes should not be redeemed
		response.data.forEach(code => {
			expect(code.redeemed_at).toBeUndefined()
		})
	})

	afterAll(async () => {
		try {
			// Clean up test coupon
			if (createdCoupon?.id) {
				await suppressErrorTesting(
					couponService,
					(id: string) => couponService.deactivateCoupon(id),
					createdCoupon.id,
				)
			}
		} catch {
			// Ignore cleanup errors
		}
	})
})
