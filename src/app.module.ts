import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module.js';
import { ProdutoModule } from './produto/produto.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgressConfigService } from './config/postgress.config.service.js';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgressConfigService,
      inject: [PostgressConfigService]
    })
  ],

})
export class AppModule { }
