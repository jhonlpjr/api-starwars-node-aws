import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import serverlessExpress from '@vendia/serverless-express';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from '@nestjs/class-validator';
import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

export async function createApp(expressApp: Express): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {cors: true}
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  return app;
}

