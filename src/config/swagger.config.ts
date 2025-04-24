import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const securityOptions: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
};

const config = new DocumentBuilder()
  .setTitle('Operations Tracker API')
  .setDescription('The authentication API description')
  .addServer('api')
  .addBearerAuth(securityOptions)
  .setVersion('1.0')
  .build();

export const documentFactory = (app: INestApplication) => {
  return SwaggerModule.createDocument(app, config);
};
