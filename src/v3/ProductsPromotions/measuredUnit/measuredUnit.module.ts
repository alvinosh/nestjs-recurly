import { RecurlyConfigDto } from '../../../config/config.dto'
import { ConfigValidationModule } from '../../../config/config.module'
import { MeasuredUnitService } from './measuredUnit.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [MeasuredUnitService],
	exports: [MeasuredUnitService],
})
export class MeasuredUnitModule {}
