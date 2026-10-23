import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module.js';
import { ProdutoModule } from './produto/produto.module.js';


@Module({
  imports: [UsuarioModule, ProdutoModule],
})
export class AppModule { }
