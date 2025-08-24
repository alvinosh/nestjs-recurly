import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { RecurlyCreateGeneralLedgerAccountDto, RecurlyUpdateGeneralLedgerAccountDto } from './ledger.dtos'
import { LedgerService } from './ledger.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('LedgerService', () => {
	let service: LedgerService
	let createdGeneralLedgerAccountId: string

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<LedgerService>(LedgerService)
	})

	describe('General Ledger Account Operations (CRUD)', () => {
		// CREATE
		it('should create a general ledger account', async () => {
			if (!canTest()) return

			const createDto: RecurlyCreateGeneralLedgerAccountDto = {
				code: `TEST_REVENUE_${Date.now()}`,
				description: 'Test Revenue Account',
				account_type: 'revenue',
			}

			try {
				const result = await service.createGeneralLedgerAccount(createDto)
				expect(result).toBeDefined()
				expect(result.id).toBeDefined()
				expect(result.code).toBe(createDto.code)
				expect(result.description).toBe(createDto.description)
				expect(result.account_type).toBe(createDto.account_type)
				expect(result.object).toBe('general_ledger_account')
				expect(result.created_at).toBeDefined()
				
				// Store ID for subsequent tests
				createdGeneralLedgerAccountId = result.id!
			} catch (error: any) {
				if (error.message.includes('422')) {
					console.warn('Skipping general ledger account tests - RevRec feature not enabled on test site')
					return
				}
				throw error
			}
		})

		it('should create a liability general ledger account', async () => {
			if (!canTest()) return

			const createDto: RecurlyCreateGeneralLedgerAccountDto = {
				code: `TEST_LIABILITY_${Date.now()}`,
				description: 'Test Liability Account',
				account_type: 'liability',
			}

			try {
				const result = await service.createGeneralLedgerAccount(createDto)
				expect(result).toBeDefined()
				expect(result.id).toBeDefined()
				expect(result.code).toBe(createDto.code)
				expect(result.account_type).toBe('liability')
			} catch (error: any) {
				if (error.message.includes('422')) {
					console.warn('Skipping general ledger account tests - RevRec feature not enabled on test site')
					return
				}
				throw error
			}
		})

		// READ
		it('should list general ledger accounts', async () => {
			if (!canTest()) return

			try {
				const result = await service.listGeneralLedgerAccounts()
				expect(result).toBeDefined()
				expect(result.data).toBeDefined()
				expect(Array.isArray(result.data)).toBe(true)
				expect(result.object).toBe('list')

				// Should include our created account
				const ourAccount = result.data.find(account => account.id === createdGeneralLedgerAccountId)
				expect(ourAccount).toBeDefined()
			} catch (error: any) {
				if (error.message.includes('422')) {
					console.warn('Skipping general ledger account tests - RevRec feature not enabled on test site')
					return
				}
				throw error
			}
		})

		it('should get a specific general ledger account', async () => {
			if (!canTest() || !createdGeneralLedgerAccountId) {
				console.warn('Skipping get general ledger account test - no account ID available')
				return
			}

			const result = await service.getGeneralLedgerAccount(createdGeneralLedgerAccountId)
			expect(result).toBeDefined()
			expect(result.id).toBe(createdGeneralLedgerAccountId)
			expect(result.code).toContain('TEST_REVENUE_')
			expect(result.description).toBe('Test Revenue Account')
			expect(result.account_type).toBe('revenue')
		})

		it('should list general ledger accounts with query parameters', async () => {
			if (!canTest()) return

			try {
				const result = await service.listGeneralLedgerAccounts({
					limit: 5,
					order: 'desc',
					sort: 'created_at',
				})
				expect(result).toBeDefined()
				expect(result.data).toBeDefined()
				expect(Array.isArray(result.data)).toBe(true)
				expect(result.data.length).toBeLessThanOrEqual(5)
			} catch (error: any) {
				if (error.message.includes('422')) {
					console.warn('Skipping general ledger account tests - RevRec feature not enabled on test site')
					return
				}
				throw error
			}
		})

		it('should list general ledger accounts filtered by account type', async () => {
			if (!canTest()) return

			try {
				const result = await service.listGeneralLedgerAccounts({
					account_type: 'revenue',
					limit: 10,
				})
				expect(result).toBeDefined()
				expect(result.data).toBeDefined()
				expect(Array.isArray(result.data)).toBe(true)

				// Verify all returned accounts are revenue type
				result.data.forEach(account => {
					if (account.account_type) {
						expect(account.account_type).toBe('revenue')
					}
				})
			} catch (error: any) {
				if (error.message.includes('422')) {
					console.warn('Skipping general ledger account tests - RevRec feature not enabled on test site')
					return
				}
				throw error
			}
		})

		// UPDATE
		it('should update a general ledger account', async () => {
			if (!canTest() || !createdGeneralLedgerAccountId) {
				console.warn('Skipping update general ledger account test - no account ID available')
				return
			}

			const updateDto: RecurlyUpdateGeneralLedgerAccountDto = {
				description: 'Updated Test Revenue Account Description',
			}

			const result = await service.updateGeneralLedgerAccount(createdGeneralLedgerAccountId, updateDto)
			expect(result).toBeDefined()
			expect(result.id).toBe(createdGeneralLedgerAccountId)
			expect(result.description).toBe(updateDto.description)
			expect(result.updated_at).toBeDefined()

			// Verify the update by reading the account again
			const updatedAccount = await service.getGeneralLedgerAccount(createdGeneralLedgerAccountId)
			expect(updatedAccount.description).toBe(updateDto.description)
		})

		it('should update a general ledger account code', async () => {
			if (!canTest() || !createdGeneralLedgerAccountId) {
				console.warn('Skipping update general ledger account code test - no account ID available')
				return
			}

			const newCode = `UPDATED_REVENUE_${Date.now()}`
			const updateDto: RecurlyUpdateGeneralLedgerAccountDto = {
				code: newCode,
			}

			const result = await service.updateGeneralLedgerAccount(createdGeneralLedgerAccountId, updateDto)
			expect(result).toBeDefined()
			expect(result.id).toBe(createdGeneralLedgerAccountId)
			expect(result.code).toBe(newCode)

			// Verify the update by reading the account again
			const updatedAccount = await service.getGeneralLedgerAccount(createdGeneralLedgerAccountId)
			expect(updatedAccount.code).toBe(newCode)
		})
	})
})
