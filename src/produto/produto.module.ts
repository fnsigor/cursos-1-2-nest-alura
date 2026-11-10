import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller.js";
import { ProdutoRepository } from "./produto.repository.js";
import { CategoriaUnicaValidator } from "./validacao/categoria-unica.validator.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity.js";
import { ProdutoService } from "./produto.service.js";
import { UsuarioExisteValidator } from "./validacao/usuario-existe.validator.js";
import { UsuarioService } from "../usuario/usuario.service.js";
import { UsuarioEntity } from "../usuario/usuario.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity]), TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [ProdutoController],
  providers: [
    ProdutoRepository,
    CategoriaUnicaValidator,
    ProdutoService,

    UsuarioService,
    UsuarioEntity,
    UsuarioExisteValidator,
  ]
})

export class ProdutoModule { }