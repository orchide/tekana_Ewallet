import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api_gateway.module';

import * as bodyParser from 'body-parser';
import { RmqService, ValidateInputPipe } from '@app/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('PERSISTENCE_SERVICE'));

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidateInputPipe());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(3000);
  await app.startAllMicroservices();
}
bootstrap();
