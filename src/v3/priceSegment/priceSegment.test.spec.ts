import { canTest } from '../v3.helpers'
import { RecurlyV3Module } from '../v3.module'
import { PriceSegmentService } from './priceSegment.service'
import { RecurlyPriceSegment } from './priceSegment.types'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('PriceSegmentService', () => {
	let service: PriceSegmentService
	let firstPriceSegment: RecurlyPriceSegment | undefined

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<PriceSegmentService>(PriceSegmentService)
	})

	describe('Price Segment Operations', () => {
		// READ - List price segments
		it('should list price segments', async () => {

			const response = await service.listPriceSegments({
				limit: 10,
				order: 'asc',
			})

			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)

			// If there are price segments, store the first one for the next test
			if (response.data && response.data.length > 0) {
				firstPriceSegment = response.data[0]
			}
		})

		// READ - Get single price segment by ID
		it('should get a price segment by ID', async () => {

			// Skip if no price segments exist
			if (!firstPriceSegment || !firstPriceSegment.id) {
				console.log('No price segments found to test get by ID')
				return
			}

			const priceSegment = await service.getPriceSegment(firstPriceSegment.id)

			expect(priceSegment).toBeDefined()
			expect(priceSegment.id).toBe(firstPriceSegment.id)
			expect(priceSegment.code).toBe(firstPriceSegment.code)
			expect(priceSegment.object).toBe('price_segment')
		})

		// READ - Get single price segment by code
		it('should get a price segment by code', async () => {

			// Skip if no price segments exist or no code is available
			if (!firstPriceSegment || !firstPriceSegment.code) {
				console.log('No price segments with code found to test get by code')
				return
			}

			const priceSegment = await service.getPriceSegment(`code-${firstPriceSegment.code}`)

			expect(priceSegment).toBeDefined()
			expect(priceSegment.id).toBe(firstPriceSegment.id)
			expect(priceSegment.code).toBe(firstPriceSegment.code)
			expect(priceSegment.object).toBe('price_segment')
		})

		// READ - List price segments with specific IDs filter
		it('should list price segments with specific IDs', async () => {

			// Skip if no price segments exist
			if (!firstPriceSegment || !firstPriceSegment.id) {
				console.log('No price segments found to test list with IDs filter')
				return
			}

			const response = await service.listPriceSegments({
				ids: [firstPriceSegment.id],
			})

			expect(response).toBeDefined()
			expect(response.object).toBe('list')
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data?.length).toBeGreaterThanOrEqual(1)

			// Check if the requested price segment is in the response
			const foundPriceSegment = response.data?.find(ps => ps.id === firstPriceSegment!.id)
			expect(foundPriceSegment).toBeDefined()
		})
	})
})
