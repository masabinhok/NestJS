import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger} from './middlewares/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(logger).exclude({
        path: 'cats', method: RequestMethod.GET
      }, {
        path: 'cats', method: RequestMethod.POST
      },  'cats/*sabin').forRoutes(CatsController);
  }
}
