import { RmqService } from './../../../libs/common/src/rmq/rmq.service';
import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/billing/.env',
    }),
  ],
  controllers: [BillingController],
  providers: [BillingService, RmqService],
})
export class BillingModule {}
