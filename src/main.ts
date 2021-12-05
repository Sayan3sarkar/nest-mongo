import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import CONFIG from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = await app.listen(CONFIG.appPort);
  console.log(`App started on port: ${CONFIG.appPort}`);
}
bootstrap();
