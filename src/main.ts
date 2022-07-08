import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as compression from 'compression';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(compression());
  app.use('/upload', express.static(join(__dirname, '..', 'upload')));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({
    origin: '*', // temporary
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Assesment Findings')
    .setDescription('The Finding assesment api description')
    .setVersion('0.7')
    .setExternalDoc('Postman Collection', '/api-json')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  await app.listen(+configService.get('PORT') || 3000);
}
bootstrap();
