import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { SiteService } from './site.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('SiteService', () => {
	let service: SiteService
	let siteId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<SiteService>(SiteService)
	})

	describe('Site Operations', () => {
		it('should list sites', async () => {
			const sites = await service.listSites()
			expect(sites).toBeDefined()
			expect(sites.data).toBeDefined()
			expect(Array.isArray(sites.data)).toBe(true)

			// Store the first site ID for subsequent tests
			if (sites.data.length > 0) {
				siteId = sites.data[0].id!
			}
		})

		it('should get a specific site', async () => {
			if (!siteId) {
				console.warn('Skipping get site test - no site ID available')
				return
			}

			const site = await service.getSite(siteId)
			expect(site).toBeDefined()
			expect(site.id).toBe(siteId)
			expect(site.subdomain).toBeDefined()
		})

		it('should list sites with query parameters', async () => {

			const sites = await service.listSites({
				limit: 1,
				order: 'asc',
				sort: 'created_at',
			})
			expect(sites).toBeDefined()
			expect(sites.data).toBeDefined()
			expect(Array.isArray(sites.data)).toBe(true)
		})
	})
})
