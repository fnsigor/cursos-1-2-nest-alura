import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller.js";
import { ProdutoRepository } from "./produto.repository.js";
import { CategoriaUnicaValidator } from "./validacao/categoria-unica.validator.js";

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoRepository, CategoriaUnicaValidator]
})

export class ProdutoModule { }