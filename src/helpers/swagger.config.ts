import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Operations Tracker API')
  .setDescription('The authentication API description')
  .setVersion('1.0')
  .build();

export const documentFactory = (app: INestApplication) => {
  return SwaggerModule.createDocument(app, config);
};
