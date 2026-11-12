import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoRepository } from "./produto.repository";
import { CategoriaUnicaValidator } from "./validacao/categoria-unica.validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./produto-imagens.entity";
import { ProdutoService } from "./produto.service";
import { UsuarioExisteValidator } from "./validacao/usuario-existe.validator";
import { UsuarioService } from "../usuario/usuario.service";
import { UsuarioEntity } from "../usuario/usuario.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity, ProdutoCaracteristicaEntity, ProdutoImagemEntity]), TypeOrmModule.forFeature([UsuarioEntity])],
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