import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger) we could use it globally....
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
