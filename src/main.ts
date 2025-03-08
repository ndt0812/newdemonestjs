import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Thiết lập Swagger
  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('API documentation for demo project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Truy cập tại http://localhost:3000/api

  const PORT = 3000
  await app.listen(PORT);

  Logger.log(`Server is running on http://localhost:${PORT}`, 'Server')
}
bootstrap();
