import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { PERSISTENCE_SERVICE } from '../../constants/services';

@Module({
  controllers: [BillingController],
  providers: [BillingService],
  exports: [BillingModule],
  imports: [
    RmqModule.register({
      name: PERSISTENCE_SERVICE,
    }),
  ],
})
export class BillingModule {}
