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
  //Validations
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  //await app.listen(3000);


  //const expressApp = app.getHttpAdapter().getInstance();
  //return serverlessExpress({ app: expressApp });
  return app;
}
//bootstrap();

//Para Serverless Offline
// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await createApp());
//   return server(event, context, callback);
// };
