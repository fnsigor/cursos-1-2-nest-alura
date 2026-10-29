import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,

      //ignora (oui não) no json tudo o que não estiver na classe DTO
      //se for true, propriedades extras disparam erro
      forbidNonWhitelisted: true
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
