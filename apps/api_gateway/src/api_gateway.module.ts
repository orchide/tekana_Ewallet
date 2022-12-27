import { WalletModule } from './modules/wallet/wallet.module';
import { MerchantsModule } from './modules/merchants/merchants.module';
import { BILLING_SERVICE, PERSISTENCE_SERVICE } from './constants/services';
import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api_gateway.controller';
import { ApiGatewayService } from './api_gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BillingService } from './modules/billing/billing.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'apps/auth/src/auth.module';
import { BillingModule } from './modules/billing/billing.module';

@Module({
  imports: [
    BillingModule,
    MerchantsModule,
    WalletModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/api_gateway/.env',
    }),
    RmqModule.register({
      name: BILLING_SERVICE,
    }),
    AuthModule,
    RmqModule.register({
      name: PERSISTENCE_SERVICE,
    }),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService, BillingService],
})
export class ApiGatewayModule {}
