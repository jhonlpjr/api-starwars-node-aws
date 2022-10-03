import { Server } from 'http';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import express from 'express';
import { createApp } from './main';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer: Server;

function SwaggerCustomOptions() {
  return {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
}

async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const app = await createApp(expressApp);

  //Swagger
  const config = new DocumentBuilder()
    .setTitle('Star Wars Api')
    .setDescription('Star Wars API Application')
    .setVersion('1.0')
    .build();

  const custom = SwaggerCustomOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, custom);

  await app.listen(8080);

  return createServer(expressApp);
}

export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
