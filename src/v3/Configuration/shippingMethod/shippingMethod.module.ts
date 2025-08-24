import { ShippingMethodService } from './shippingMethod.service'
import { RecurlyConfigDto } from '@/config/config.dto'
import { ConfigValidationModule } from '@/config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [ShippingMethodService],
	exports: [ShippingMethodService],
})
export class ShippingMethodModule {}
