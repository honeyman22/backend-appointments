import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './global/global-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix(process.env.BASE_URL ?? 'api/v1');
}
bootstrap();
