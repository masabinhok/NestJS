import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');

    const now = Date.now();

    return next.handle()
    .pipe(tap(()=> console.log(`Response sent in ${Date.now() - now} ms`)));
  }
}