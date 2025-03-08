import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Thiết lập Swagger
  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('API documentation for demo project')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Truy cập tại http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();
