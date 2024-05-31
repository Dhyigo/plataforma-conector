import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validationPipeConfig } from './config/validation-pipe.config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('/v1');
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig));

  const configService = new ConfigService();
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
