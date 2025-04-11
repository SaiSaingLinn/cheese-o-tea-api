import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // Automatically transform payloads to DTOs
    whitelist: true,  // Remove properties that do not have decorators
    forbidNonWhitelisted: true,  // Throw error if non-whitelisted properties are passed
  }));

  /**
   * Cross-origin resource sharing (CORS) is a mechanism that allows resources
   * to be requested from another domain.
   */
  app.enableCors();

  /**
   * To protect from some well-known web vulnerabilities by setting
   * HTTP headers appropriately.
   */
  app.use(helmet());

  /**
   * Versioning allows you to have different versions of your controllers or
   * individual routes running within the same application. Applications change
   * very often and it is not unusual that there are breaking changes that you
   * need to make while still needing to support the previous version of the
   * application.
   */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  // Initialize Swagger using `SwaggerModule` class
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cheese O Tea API')
    .setDescription('Core api for Cheese O Tea app')
    .setVersion('0.0.1')
    // .addBearerAuth()
    .build();

  const swaggerDocument = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
