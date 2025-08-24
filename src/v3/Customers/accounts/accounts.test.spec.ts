import { canTest } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { AccountsService } from './accounts.service'
import { RecurlyAccount, RecurlyAccountBalance, RecurlyAccountListResponse } from './accounts.types'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

/* NOTE: This test suite assumes a valid Recurly account is configured in the environment with default account settings. Standard accounts don't come with features:
 *
 * * account_hierarchy
 * * external_resource_tracking
 *
 * Therefore some tests have been commented out, feel free to uncomment them if you have a Recurly account with these features enabled.
 */

describe('Accounts', () => {
	let accountsService: AccountsService

	let mainAccount: RecurlyAccount
	//let childAccount: RecurlyAccount
	const testEmail = faker.internet.email()
	const testCode = faker.string.alpha(49)
	//const childCode = faker.string.alpha(49)

	beforeAll(async () => {
		if (!canTest()) {
			console.warn('Skipping Accounts tests due to configuration or environment issues.')
			return
		}

		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		accountsService = moduleRef.get<AccountsService>(AccountsService)
	})

	// CRUD ORDER: CREATE
	describe('Create Operations', () => {
		it('Create a main account', async () => {
			mainAccount = await accountsService.createAccount({
				code: testCode,
				email: testEmail,
				first_name: 'Benjamin',
				last_name: 'Du Monde',
				company: 'Test Company Inc.',
				preferred_time_zone: 'America/Chicago',
				preferred_locale: 'en-US',
				cc_emails: 'admin@example.com',
				username: 'benjamin.dumonde',
				vat_number: 'VAT123456',
				address: {
					phone: '+1-504-555-1234',
					street1: '900 Camp St',
					street2: 'Suite 100',
					city: 'New Orleans',
					region: 'LA',
					postal_code: '70115',
					country: 'US',
				},
			})

			expect(mainAccount).toBeDefined()
			expect(mainAccount.id).toBeDefined()
			expect(mainAccount.code).toBe(testCode)
			expect(mainAccount.email).toBe(testEmail)
			expect(mainAccount.first_name).toBe('Benjamin')
			expect(mainAccount.last_name).toBe('Du Monde')
			expect(mainAccount.company).toBe('Test Company Inc.')
			expect(mainAccount.preferred_time_zone).toBe('America/Chicago')
			expect(mainAccount.preferred_locale).toBe('en-US')
			expect(mainAccount.cc_emails).toBe('admin@example.com')
			expect(mainAccount.username).toBe('benjamin.dumonde')
			expect(mainAccount.vat_number).toBe('VAT123456')
			expect(mainAccount.address?.phone).toBe('15045551234')
			expect(mainAccount.address?.street1).toBe('900 Camp St')
			expect(mainAccount.address?.street2).toBe('Suite 100')
			expect(mainAccount.address?.city).toBe('New Orleans')
			expect(mainAccount.address?.region).toBe('LA')
			expect(mainAccount.address?.postal_code).toBe('70115')
			expect(mainAccount.address?.country).toBe('US')
		})

		// it('Create a child account', async () => {
		// 	childAccount = await accountsService.createAccount({
		// 		code: childCode,
		// 		email: faker.internet.email(),
		// 		first_name: 'Marie',
		// 		last_name: 'Laveau',
		// 		parent_account_id: mainAccount.id,
		// 		bill_to: 'parent',
		// 		address: {
		// 			street1: '1020 St. Louis St',
		// 			city: 'New Orleans',
		// 			region: 'LA',
		// 			postal_code: '70116',
		// 			country: 'US',
		// 		},
		// 	})

		// 	expect(childAccount).toBeDefined()
		// 	expect(childAccount.id).toBeDefined()
		// 	expect(childAccount.code).toBe(childCode)
		// 	expect(childAccount.first_name).toBe('Marie')
		// 	expect(childAccount.last_name).toBe('Laveau')
		// 	expect(childAccount.parent_account_id).toBe(mainAccount.id)
		// 	expect(childAccount.bill_to).toBe('parent')
		// 	expect(childAccount.address?.street1).toBe('1020 St. Louis St')
		// 	expect(childAccount.address?.city).toBe('New Orleans')
		// 	expect(childAccount.address?.region).toBe('LA')
		// 	expect(childAccount.address?.postal_code).toBe('70116')
		// 	expect(childAccount.address?.country).toBe('US')
		// })
	})

	// CRUD ORDER: READ
	describe('Read Operations', () => {
		it("List all site's accounts", async () => {
			const result: RecurlyAccountListResponse = await accountsService.listAccounts()
			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(result.data).toBeDefined()
			expect(result.data.length).toBeGreaterThan(0)

			// Find our created accounts
			const foundMainAccount = result.data.find(acc => acc.id === mainAccount.id)
			//const foundChildAccount = result.data.find(acc => acc.id === childAccount.id)

			expect(foundMainAccount).toBeDefined()
			expect(foundMainAccount?.first_name).toBe('Benjamin')
			expect(foundMainAccount?.last_name).toBe('Du Monde')

			// expect(foundChildAccount).toBeDefined()
			// expect(foundChildAccount?.first_name).toBe('Marie')
			// expect(foundChildAccount?.last_name).toBe('Laveau')
		})

		it('List accounts with query parameters', async () => {
			const result: RecurlyAccountListResponse = await accountsService.listAccounts({
				limit: 5,
				order: 'desc',
				sort: 'created_at',
				email: testEmail,
			})
			expect(result).toBeDefined()
			expect(result.data.length).toBeLessThanOrEqual(5)

			// Should find our main account since we filtered by email
			const foundAccount = result.data.find(acc => acc.email === testEmail)
			expect(foundAccount).toBeDefined()
		})

		it('Fetch main account by ID', async () => {
			const fetchedAccount: RecurlyAccount = await accountsService.getAccount(mainAccount.id as string)
			expect(fetchedAccount).toBeDefined()
			expect(fetchedAccount.id).toBe(mainAccount.id)
			expect(fetchedAccount.code).toBe(mainAccount.code)
			expect(fetchedAccount.email).toBe(mainAccount.email)
			expect(fetchedAccount.first_name).toBe(mainAccount.first_name)
			expect(fetchedAccount.last_name).toBe(mainAccount.last_name)
			expect(fetchedAccount.company).toBe(mainAccount.company)
		})

		// it('Fetch child account by ID', async () => {
		// 	const fetchedChildAccount: RecurlyAccount = await accountsService.getAccount(childAccount.id as string)
		// 	expect(fetchedChildAccount).toBeDefined()
		// 	expect(fetchedChildAccount.id).toBe(childAccount.id)
		// 	expect(fetchedChildAccount.code).toBe(childAccount.code)
		// 	expect(fetchedChildAccount.parent_account_id).toBe(mainAccount.id)
		// 	expect(fetchedChildAccount.bill_to).toBe('parent')
		// })

		it('Get account balance', async () => {
			const balance: RecurlyAccountBalance = await accountsService.getAccountBalance(mainAccount.id as string)
			expect(balance).toBeDefined()
			expect(balance.object).toBeDefined()
			expect(balance.account).toBeDefined()
			expect(balance.account?.id).toBe(mainAccount.id)
			expect(balance.past_due).toBeDefined()
			expect(balance.balances).toBeDefined()
		})

		// it('List child accounts of main account', async () => {
		// 	const childAccounts: AccountListResponse = await accountsService.listChildAccounts(mainAccount.id as string)
		// 	expect(childAccounts).toBeDefined()
		// 	expect(childAccounts.object).toBe('list')
		// 	expect(childAccounts.data).toBeInstanceOf(Array)

		// 	// Should find our child account
		// 	const foundChild = childAccounts.data.find(acc => acc.id === childAccount.id)
		// 	expect(foundChild).toBeDefined()
		// 	expect(foundChild?.parent_account_id).toBe(mainAccount.id)
		// })

		// it('List child accounts with query parameters', async () => {
		// 	const childAccounts: AccountListResponse = await accountsService.listChildAccounts(
		// 		mainAccount.id as string,
		// 		{
		// 			limit: 10,
		// 			order: 'desc',
		// 			sort: 'created_at',
		// 		}
		// 	)
		// 	expect(childAccounts).toBeDefined()
		// 	expect(childAccounts.data.length).toBeLessThanOrEqual(10)
		// })

		// it('List account external subscriptions', async () => {
		// 	const externalSubscriptions: ExternalSubscriptionListResponse = await accountsService.listAccountExternalSubscriptions(
		// 		mainAccount.id as string
		// 	)
		// 	expect(externalSubscriptions).toBeDefined()
		// 	expect(externalSubscriptions.object).toBe('list')
		// 	expect(externalSubscriptions.data).toBeInstanceOf(Array)
		// })

		// it('List account external subscriptions with parameters', async () => {
		// 	const externalSubscriptions: ExternalSubscriptionListResponse = await accountsService.listAccountExternalSubscriptions(
		// 		mainAccount.id as string,
		// 		{
		// 			sort: 'created_at',
		// 		}
		// 	)
		// 	expect(externalSubscriptions).toBeDefined()
		// 	expect(externalSubscriptions.object).toBe('list')
		// 	expect(externalSubscriptions.data).toBeInstanceOf(Array)
		// })
	})

	// CRUD ORDER: UPDATE
	describe('Update Operations', () => {
		it('Update main account', async () => {
			const updatedData = {
				first_name: 'Benjamin Updated',
				last_name: 'Du Monde Updated',
				company: 'Updated Company LLC',
				preferred_time_zone: 'America/New_York',
				cc_emails: 'updated@example.com',
				address: {
					phone: '+1-212-555-9999',
					street1: '123 Broadway',
					city: 'New York',
					region: 'NY',
					postal_code: '10001',
					country: 'US',
				},
			}

			const updatedAccount: RecurlyAccount = await accountsService.updateAccount(
				mainAccount.id as string,
				updatedData,
			)

			expect(updatedAccount).toBeDefined()
			expect(updatedAccount.id).toBe(mainAccount.id)
			expect(updatedAccount.first_name).toBe('Benjamin Updated')
			expect(updatedAccount.last_name).toBe('Du Monde Updated')
			expect(updatedAccount.company).toBe('Updated Company LLC')
			expect(updatedAccount.preferred_time_zone).toBe('America/New_York')
			expect(updatedAccount.cc_emails).toBe('updated@example.com')
			expect(updatedAccount.address?.phone).toBe('12125559999')
			expect(updatedAccount.address?.street1).toBe('123 Broadway')
			expect(updatedAccount.address?.city).toBe('New York')
			expect(updatedAccount.address?.region).toBe('NY')
			expect(updatedAccount.address?.postal_code).toBe('10001')

			// Update our local reference for future tests
			mainAccount = updatedAccount
		})

		it('Verify main account update by reading', async () => {
			const verifiedAccount: RecurlyAccount = await accountsService.getAccount(mainAccount.id as string)
			expect(verifiedAccount.first_name).toBe('Benjamin Updated')
			expect(verifiedAccount.last_name).toBe('Du Monde Updated')
			expect(verifiedAccount.company).toBe('Updated Company LLC')
			expect(verifiedAccount.preferred_time_zone).toBe('America/New_York')
			expect(verifiedAccount.address?.city).toBe('New York')
			expect(verifiedAccount.address?.region).toBe('NY')
		})

		// it('Update child account', async () => {
		// 	const updatedChildData = {
		// 		first_name: 'Marie Updated',
		// 		last_name: 'Laveau Updated',
		// 		address: {
		// 			street1: '456 Magazine St',
		// 			city: 'New Orleans',
		// 			region: 'LA',
		// 			postal_code: '70130',
		// 			country: 'US',
		// 		},
		// 	}

		// 	const updatedChildAccount: RecurlyAccount = await accountsService.updateAccount(
		// 		childAccount.id as string,
		// 		updatedChildData
		// 	)

		// 	expect(updatedChildAccount).toBeDefined()
		// 	expect(updatedChildAccount.id).toBe(childAccount.id)
		// 	expect(updatedChildAccount.first_name).toBe('Marie Updated')
		// 	expect(updatedChildAccount.last_name).toBe('Laveau Updated')
		// 	expect(updatedChildAccount.address?.street1).toBe('456 Magazine St')
		// 	expect(updatedChildAccount.address?.postal_code).toBe('70130')

		// 	// Update our local reference for future tests
		// 	childAccount = updatedChildAccount
		// })

		// it('Verify child account update by reading', async () => {
		// 	const verifiedChildAccount: RecurlyAccount = await accountsService.getAccount(childAccount.id as string)
		// 	expect(verifiedChildAccount.first_name).toBe('Marie Updated')
		// 	expect(verifiedChildAccount.last_name).toBe('Laveau Updated')
		// 	expect(verifiedChildAccount.address?.street1).toBe('456 Magazine St')
		// 	expect(verifiedChildAccount.address?.postal_code).toBe('70130')
		// })
	})

	// CRUD ORDER: DELETE (and REACTIVATE)
	describe('Delete and Reactivate Operations', () => {
		// it('Deactivate child account', async () => {
		// 	const deactivatedAccount: RecurlyAccount = await accountsService.deactivateAccount(childAccount.id as string)
		// 	expect(deactivatedAccount).toBeDefined()
		// 	expect(deactivatedAccount.id).toBe(childAccount.id)
		// 	expect(deactivatedAccount.state).toBe('closed')
		// 	expect(deactivatedAccount.deleted_at).toBeDefined()

		// 	// Update our local reference
		// 	childAccount = deactivatedAccount
		// })

		// it('Verify child account deactivation by reading', async () => {
		// 	const verifiedAccount: RecurlyAccount = await accountsService.getAccount(childAccount.id as string)
		// 	expect(verifiedAccount.state).toBe('closed')
		// 	expect(verifiedAccount.deleted_at).toBeDefined()
		// })

		// it('Reactivate child account', async () => {
		// 	const reactivatedAccount: RecurlyAccount = await accountsService.reactivateAccount(childAccount.id as string)
		// 	expect(reactivatedAccount).toBeDefined()
		// 	expect(reactivatedAccount.id).toBe(childAccount.id)
		// 	expect(reactivatedAccount.state).toBe('active')

		// 	// Update our local reference
		// 	childAccount = reactivatedAccount
		// })

		// it('Verify child account reactivation by reading', async () => {
		// 	const verifiedAccount: RecurlyAccount = await accountsService.getAccount(childAccount.id as string)
		// 	expect(verifiedAccount.state).toBe('active')
		// })

		it('Deactivate main account', async () => {
			const deactivatedMainAccount: RecurlyAccount = await accountsService.deactivateAccount(
				mainAccount.id as string,
			)
			expect(deactivatedMainAccount).toBeDefined()
			expect(deactivatedMainAccount.id).toBe(mainAccount.id)
			expect(deactivatedMainAccount.state).toBe('inactive')
			expect(deactivatedMainAccount.deleted_at).toBeDefined()

			// Update our local reference
			mainAccount = deactivatedMainAccount
		})

		it('Verify main account deactivation by reading', async () => {
			const verifiedMainAccount: RecurlyAccount = await accountsService.getAccount(mainAccount.id as string)
			expect(verifiedMainAccount.state).toBe('inactive')
			expect(verifiedMainAccount.deleted_at).toBeDefined()
		})

		it('Reactivate main account', async () => {
			const reactivatedMainAccount: RecurlyAccount = await accountsService.reactivateAccount(
				mainAccount.id as string,
			)
			expect(reactivatedMainAccount).toBeDefined()
			expect(reactivatedMainAccount.id).toBe(mainAccount.id)
			expect(reactivatedMainAccount.state).toBe('active')

			// Update our local reference
			mainAccount = reactivatedMainAccount
		})

		it('Verify main account reactivation by reading', async () => {
			const verifiedMainAccount: RecurlyAccount = await accountsService.getAccount(mainAccount.id as string)
			expect(verifiedMainAccount.state).toBe('active')
		})
	})

	// Final cleanup - deactivate accounts for cleanup
	describe('Cleanup', () => {
		// it('Final cleanup - deactivate child account', async () => {
		// 	const deactivatedAccount: RecurlyAccount = await accountsService.deactivateAccount(childAccount.id as string)
		// 	expect(deactivatedAccount.state).toBe('closed')
		// })

		it('Final cleanup - deactivate main account', async () => {
			const deactivatedAccount: RecurlyAccount = await accountsService.deactivateAccount(mainAccount.id as string)
			expect(deactivatedAccount.state).toBe('inactive')
		})
	})

	afterAll(async () => {})
})
