import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import 'dotenv/config';
import { warn } from 'console';

import {UserModule} from "./user/user.module";
import {ProductModule} from "./product/product.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: true,
  }));

  const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('API')
      .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [
      UserModule,
      ProductModule,
    ],
  });
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  warn(`APP IS LISTENING TO PORT ${PORT}`);
}
bootstrap();
