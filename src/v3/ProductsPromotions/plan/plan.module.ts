import { RecurlyConfigDto } from '../../../config/config.dto'
import { ConfigValidationModule } from '../../../config/config.module'
import { AddOnModule } from './addon/addon.module'
import { PlanService } from './plan.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto), AddOnModule],
	controllers: [],
	providers: [PlanService],
	exports: [PlanService, AddOnModule],
})
export class PlanModule {}
