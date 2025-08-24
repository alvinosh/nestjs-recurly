import { AccountsService } from '../v3/Customers/accounts/accounts.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SandboxService {
	private readonly logger = new Logger(SandboxService.name)

	constructor(private readonly accountsService: AccountsService) {}

	async run(): Promise<any> {
		this.logger.log('Running sandbox service...')

		// Example usage of AccountsService
		const accounts = await this.accountsService.listAccounts()
		this.logger.log(`Retrieved ${accounts.data?.length} accounts.`)

		return accounts
	}
}
