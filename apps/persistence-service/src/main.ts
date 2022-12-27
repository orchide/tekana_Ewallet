import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { PersistenceServiceModule } from './persistence-service.module';

async function bootstrap() {
  const app = await NestFactory.create(PersistenceServiceModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('PERSISTENCE_SERVICE'));
  await app.startAllMicroservices();
  await app.listen(3003);
}
bootstrap();
