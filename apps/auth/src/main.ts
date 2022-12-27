import { ValidateInputPipe } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });

  app.setGlobalPrefix('api/v1');
  const config = new ConfigService();
  app.useGlobalPipes(new ValidateInputPipe());

  await app.listen(config.get('PORT'));
  await app.startAllMicroservices();
}
bootstrap();
