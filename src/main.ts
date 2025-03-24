import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './global/global-exception-filter';
import { CustomZodValidationPipe } from './global/pipes/zod.validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new CustomZodValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix(process.env.BASE_URL ?? 'api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
