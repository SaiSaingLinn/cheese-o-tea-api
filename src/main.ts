import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform payloads to DTOs
    whitelist: true,  // Remove properties that do not have decorators
    forbidNonWhitelisted: true,  // Throw error if non-whitelisted properties are passed
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
