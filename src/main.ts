import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { StandardSchemaValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,

      //ignora (oui não) no json tudo o que não estiver na classe DTO
      //se for true, propriedades extras disparam erro
      forbidNonWhitelisted: true
    }),
    new StandardSchemaValidationPipe()
  )

  /*
  , o class-validator não sabe onde ele buscar o usuarioRepository que está no construtor do nosso validator. 
  
  Portanto, precisamos explicitar ao class-validator que ele pode usar o mesmo mecanismo de resolução de dependências que o Nest tem. Assim, quando for criar nosso validator, ele saberá buscar o usuarioRepository.

  Para o class-validator resolver as dependências que só o Nest sabe resolver, precisamos passar o mesmo contêiner de resolução de dependências que o Nest usa. Portanto, no useContainer(), basta passarmos uma referência para o root module da nossa aplicação. A partir da raiz da aplicação, ele conseguirá resolver qualquer dependência que esteja abaixo dessa raiz.

  Assim, o class-validator conseguirá resolver suas dependências e das classes nele contidas do mesmo jeito que o Nest resolve. Ademais, vamos passar um segundo parâmetro, definindo que o class-validator deve usar o seu próprio contêiner para tentar solucionar a dependência, caso não consiga resolvê-la como o Nest:



  */
  useContainer(app.select(AppModule), {
    //ne nao conseguir resolver dependencias como o nest, usa o proprio container p tentar resolver dependencias
    fallbackOnErrors: true
  })

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
