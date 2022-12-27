import { DatabaseModule } from './../../../libs/common/src/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { PersistenceServiceController } from './persistence-service.controller';
import { PersistenceServiceService } from './persistence-service.service';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/persistence-service/.env',
    }),
    DatabaseModule,
  ],
  controllers: [PersistenceServiceController],
  providers: [PersistenceServiceService],
})
export class PersistenceServiceModule {}
