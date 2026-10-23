import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller.js";
import { ProdutoRepository } from "./produto.repository.js";

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoRepository]
})

export class ProdutoModule { }