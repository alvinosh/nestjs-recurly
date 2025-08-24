import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { PerformanceObligationsService } from './performanceObligations.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('PerformanceObligationsService', () => {
	let service: PerformanceObligationsService
	let performanceObligationId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<PerformanceObligationsService>(PerformanceObligationsService)
	})

	describe('Performance Obligations Operations', () => {
		it('should list performance obligations', async () => {
			if (!canTest()) return

			try {
				const performanceObligations = await service.listPerformanceObligations()
				expect(performanceObligations).toBeDefined()
				expect(performanceObligations.data).toBeDefined()
				expect(Array.isArray(performanceObligations.data)).toBe(true)

				// Store the first performance obligation ID for subsequent tests
				if (performanceObligations.data && performanceObligations.data.length > 0) {
					performanceObligationId = performanceObligations.data[0].id!
				}
			} catch (error: any) {
				// Performance Obligations require Recurly RevRec feature
				if (error.message.includes('422')) {
					console.warn('Performance Obligations feature not enabled - skipping test')
					return
				}
				throw error
			}
		})

		it('should get a specific performance obligation', async () => {
			if (!canTest()) return

			if (!performanceObligationId) {
				console.warn('Skipping get performance obligation test - no performance obligation ID available')
				return
			}

			try {
				const performanceObligation = await service.getPerformanceObligation(performanceObligationId)
				expect(performanceObligation).toBeDefined()
				expect(performanceObligation.id).toBe(performanceObligationId)
				expect(performanceObligation.name).toBeDefined()
			} catch (error: any) {
				// Performance Obligations require Recurly RevRec feature
				if (error.message.includes('422')) {
					console.warn('Performance Obligations feature not enabled - skipping test')
					return
				}
				throw error
			}
		})

		it('should handle empty performance obligations list', async () => {
			if (!canTest()) return

			try {
				const performanceObligations = await service.listPerformanceObligations()
				expect(performanceObligations).toBeDefined()
				expect(performanceObligations.data).toBeDefined()

				// Even if empty, the response should be a valid array
				expect(Array.isArray(performanceObligations.data)).toBe(true)
			} catch (error: any) {
				// Performance Obligations require Recurly RevRec feature
				if (error.message.includes('422')) {
					console.warn('Performance Obligations feature not enabled - skipping test')
					return
				}
				throw error
			}
		})
	})
})
