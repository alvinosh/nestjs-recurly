import { ShippingAddressService } from './shippingAddress.service'
import { RecurlyConfigDto } from '@config/config.dto'
import { ConfigValidationModule } from '@config/config.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [ShippingAddressService],
	exports: [ShippingAddressService],
})
export class ShippingAddressModule {}
