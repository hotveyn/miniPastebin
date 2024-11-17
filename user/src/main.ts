import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      skipMissingProperties: true,
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  const httpPort = +configService.get('http.httpPort');
  const httpHost = configService.get('http.httpHost');

  await app.listen(httpPort, httpHost);
}
bootstrap();
