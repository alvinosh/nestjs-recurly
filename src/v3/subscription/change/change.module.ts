import { Module } from '@nestjs/common';
import { RecurlyConfigDto } from '../../../config/config.dto';
import { ConfigValidationModule } from '../../../config/config.module';
import { ChangeService } from './change.service';

@Module({
  imports: [ConfigValidationModule.register(RecurlyConfigDto)],
  providers: [ChangeService],
  exports: [ChangeService],
})
export class ChangeModule {}
