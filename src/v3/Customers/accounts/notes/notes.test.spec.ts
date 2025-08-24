import { canTest, suppressErrorTesting } from '../../../v3.helpers'
import { RecurlyV3Module } from '../../../v3.module'
import { AccountsService } from '../accounts.service'
import { RecurlyAccount } from '../accounts.types'
import { AccountNotesService } from './notes.service'
import { RecurlyAccountNote, RecurlyAccountNoteListResponse } from './notes.types'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'

/* NOTE: This test suite assumes a valid Recurly account is configured in the environment.
 * Since the Recurly API only provides read endpoints for notes (list and get),
 * we'll need to rely on existing notes in the test account or notes created through
 * other means (e.g., manual creation in the Recurly dashboard).
 */

describe('Account Notes', () => {
	let notesService: AccountNotesService
	let accountsService: AccountsService
	let testAccount: RecurlyAccount

	beforeAll(async () => {
		if (!canTest()) {
			console.warn('Skipping Account Notes tests due to configuration or environment issues.')
			return
		}

		const moduleRef = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module],
		}).compile()

		notesService = moduleRef.get<AccountNotesService>(AccountNotesService)
		accountsService = moduleRef.get<AccountsService>(AccountsService)

		// Create a test account to work with
		testAccount = await accountsService.createAccount({
			code: faker.string.alpha(49),
			email: faker.internet.email(),
			first_name: 'Notes',
			last_name: 'Test Account',
		})
	})

	// READ Operations (Note: Recurly API only provides read endpoints for notes)
	describe('Read Operations', () => {
		it("List account's notes", async () => {
			const result: RecurlyAccountNoteListResponse = await notesService.listAccountNotes(testAccount.id as string)

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(result.data).toBeDefined()
			expect(Array.isArray(result.data)).toBe(true)
		})

		it('List notes with query parameters', async () => {
			const result: RecurlyAccountNoteListResponse = await notesService.listAccountNotes(
				testAccount.id as string,
				{
					ids: [], // Empty array since we don't know existing note IDs
				},
			)

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(result.data).toBeDefined()
		})

		// it('Should handle non-existent account gracefully', async () => {
		// 	await expect(notesService.listAccountNotes('non-existent-account-id')).rejects.toThrow()
		// })

		// Note: We can only test getAccountNote if we have existing notes
		// Since we can't create notes via API, we'll check if any notes exist first
		it('Get individual note if notes exist', async () => {
			const notesList = await notesService.listAccountNotes(testAccount.id as string)

			if (notesList.data && notesList.data.length > 0) {
				const firstNote = notesList.data[0]
				const fetchedNote: RecurlyAccountNote = await notesService.getAccountNote(
					testAccount.id as string,
					firstNote.id as string,
				)

				expect(fetchedNote).toBeDefined()
				expect(fetchedNote.id).toBe(firstNote.id)
				expect(fetchedNote.message).toBeDefined()
				expect(fetchedNote.account_id).toBe(testAccount.id)
			} else {
				console.debug('No notes found for test account, skipping individual note fetch test')
			}
		})

		// it('Should handle non-existent note gracefully', async () => {
		// 	await expect(
		// 		notesService.getAccountNote(testAccount.id as string, 'non-existent-note-id'),
		// 	).rejects.toThrow()
		// })

		// it('Should use custom API key when provided', async () => {
		// 	// This test will fail if the custom API key is invalid, which is expected
		// 	const customApiKey = 'invalid-custom-api-key'

		// 	await expect(
		// 		notesService.listAccountNotes(testAccount.id as string, undefined, customApiKey),
		// 	).rejects.toThrow()
		// })
	})

	// Cleanup
	afterAll(async () => {
		if (testAccount && testAccount.id) {
			try {
				await suppressErrorTesting(
					accountsService,
					(id: string) => accountsService.deactivateAccount(id),
					testAccount.id,
				)
			} catch (error) {
				console.error('Failed to cleanup test account:', error)
			}
		}
	})
})
