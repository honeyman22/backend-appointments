'use strict';

Object.defineProperty(exports, '__esModule', { value: true });
const core_1 = require('@nestjs/core');
const app_module_1 = require('./app.module');
const global_exception_filter_1 = require('./global/global-exception-filter');
const zod_validation_pipe_1 = require('./global/pipes/zod.validation.pipe');
async function bootstrap() {
  const app = await core_1.NestFactory.create(app_module_1.AppModule);
  app.useGlobalPipes(new zod_validation_pipe_1.CustomZodValidationPipe());
  app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
  app.setGlobalPrefix(process.env.BASE_URL ?? 'api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
