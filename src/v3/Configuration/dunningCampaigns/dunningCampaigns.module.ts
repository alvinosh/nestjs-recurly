import { DunningCampaignsService } from './dunningCampaigns.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	controllers: [],
	providers: [DunningCampaignsService],
	exports: [DunningCampaignsService],
})
export class DunningCampaignsModule {}
