import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //strips unallowed properties
      forbidNonWhitelisted: true, //throws error if unallowed properties are found
      transform: true, //transforms payload to DTO
    })
  )

  app.enableCors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // Allow both
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  });
  await app.listen(process.env.PORT ?? 3000);
}



bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
