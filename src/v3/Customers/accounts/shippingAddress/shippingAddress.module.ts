import { RecurlyConfigDto } from '../../../../config/config.dto'
import { ConfigValidationModule } from '../../../../config/config.module'
import { ShippingAddressService } from './shippingAddress.service'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [ShippingAddressService],
	exports: [ShippingAddressService],
})
export class ShippingAddressModule {}
