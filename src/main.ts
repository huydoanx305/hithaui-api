import { AppModule } from '@/app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from '@common/config/swagger.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  const swaggerOptions = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(swaggerConfig.path, app, document);

  app.enableCors();

  await app.listen(port);
}
bootstrap();
