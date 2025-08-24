import { ConfigValidationModule } from '@/config/config.module'
import { ShippingMethodService } from './shippingMethod.service'
import { Module } from '@nestjs/common'
import { RecurlyConfigDto } from '@/config/config.dto'

@Module({
    imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [ShippingMethodService],
	exports: [ShippingMethodService],
})
export class ShippingMethodModule {}
