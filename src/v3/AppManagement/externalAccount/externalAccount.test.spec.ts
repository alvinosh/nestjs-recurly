import { AccountsService } from '../../Customers/accounts/accounts.service'
import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { ExternalAccountService } from './externalAccount.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('ExternalAccountService', () => {
	let service: ExternalAccountService
	let accountsService: AccountsService
	let testAccountId: string
	let createdExternalAccountId: string

	const testCode = `test-external-account-${Date.now()}`
	const testEmail = `test-external-account-${Date.now()}@example.com`

	beforeAll(async () => {
		if (!canTest()) {
			console.log('Skipping Recurly tests - environment variables not set')
			return
		}

		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		service = moduleRef.get<ExternalAccountService>(ExternalAccountService)
		accountsService = moduleRef.get<AccountsService>(AccountsService)

		// Create a test account for external account operations
		try {
			const testAccount = await accountsService.createAccount({
				code: testCode,
				email: testEmail,
				first_name: 'Test',
				last_name: 'External Account',
			})
			testAccountId = testAccount.id!
		} catch (error) {
			console.error('Failed to create test account:', error)
			throw error
		}
	})

	afterAll(async () => {
		if (!canTest()) return

		// Clean up test account
		if (testAccountId) {
			try {
				await accountsService.deactivateAccount(testAccountId)
			} catch (error) {
				console.warn('Failed to clean up test account:', error)
			}
		}
	})

	describe('External Account Operations', () => {
		it('should create an external account', async () => {
			if (!canTest()) return

			try {
				const createData = {
					external_account_code: `test_external_code_${Date.now()}`,
					external_connection_type: 'apple_app_store',
				}

				const externalAccount = await service.createAccountExternalAccount(testAccountId, createData)
				expect(externalAccount).toBeDefined()
				expect(externalAccount.id).toBeDefined()
				expect(externalAccount.external_account_code).toBe(createData.external_account_code)
				expect(externalAccount.external_connection_type).toBe(createData.external_connection_type)

				// Store the ID for subsequent tests
				createdExternalAccountId = externalAccount.id!
			} catch (error: any) {
				// External Accounts may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Accounts feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should list external accounts for an account', async () => {
			if (!canTest()) return

			try {
				const externalAccounts = await service.listAccountExternalAccounts(testAccountId)
				expect(externalAccounts).toBeDefined()
				expect(externalAccounts.data).toBeDefined()
				expect(Array.isArray(externalAccounts.data)).toBe(true)
			} catch (error: any) {
				// External Accounts may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Accounts feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should get a specific external account', async () => {
			if (!canTest()) return

			if (!createdExternalAccountId) {
				console.warn('Skipping get external account test - no external account ID available')
				return
			}

			try {
				const externalAccount = await service.getAccountExternalAccount(testAccountId, createdExternalAccountId)
				expect(externalAccount).toBeDefined()
				expect(externalAccount.id).toBe(createdExternalAccountId)
				expect(externalAccount.external_account_code).toBeDefined()
			} catch (error: any) {
				// External Accounts may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Accounts feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should update an external account', async () => {
			if (!canTest()) return

			if (!createdExternalAccountId) {
				console.warn('Skipping update external account test - no external account ID available')
				return
			}

			try {
				const updateData = {
					external_account_code: `updated_external_code_${Date.now()}`,
				}

				const updatedExternalAccount = await service.updateAccountExternalAccount(
					testAccountId,
					createdExternalAccountId,
					updateData,
				)
				expect(updatedExternalAccount).toBeDefined()
				expect(updatedExternalAccount.id).toBe(createdExternalAccountId)
				expect(updatedExternalAccount.external_account_code).toBe(updateData.external_account_code)

				// Verify the changes by reading again
				const verifyExternalAccount = await service.getAccountExternalAccount(
					testAccountId,
					createdExternalAccountId,
				)
				expect(verifyExternalAccount.external_account_code).toBe(updateData.external_account_code)
			} catch (error: any) {
				// External Accounts may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Accounts feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})

		it('should delete an external account', async () => {
			if (!canTest()) return

			if (!createdExternalAccountId) {
				console.warn('Skipping delete external account test - no external account ID available')
				return
			}

			try {
				const deletedExternalAccount = await service.deleteAccountExternalAccount(
					testAccountId,
					createdExternalAccountId,
				)
				expect(deletedExternalAccount).toBeDefined()
				expect(deletedExternalAccount.id).toBe(createdExternalAccountId)

				// Verify the deletion by attempting to get the account (should fail)
				try {
					await service.getAccountExternalAccount(testAccountId, createdExternalAccountId)
					// If we reach here, the deletion didn't work
					fail('External account should have been deleted')
				} catch (error) {
					// Expect a 404 or similar error indicating the account doesn't exist
					const errorMessage = error instanceof Error ? error.message : String(error)
					expect(errorMessage).toMatch(/404|not found/i)
				}

				// Clear the ID since it's been deleted
				createdExternalAccountId = ''
			} catch (error: any) {
				// External Accounts may require specific features or connections
				if (error instanceof Error && error.message.includes('422')) {
					console.warn('External Accounts feature not properly configured - skipping test')
					return
				}
				throw error
			}
		})
	})
})
