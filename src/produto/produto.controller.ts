import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository.js";
import type { IProduct, IProductRequestBody } from "./product.types.js";

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtosRepository: ProdutoRepository) { }


  @Post()
  async criarProduto(@Body() requestBody: IProductRequestBody) {
    const productToSave: IProduct = {
      ...requestBody,
      dataAtualizacao: new Date().toISOString(),
      dataCriacao: new Date().toISOString()
    }
    const repositoryResponse = await this.produtosRepository.salvar(productToSave)
    return repositoryResponse
  }

  @Get()
  async listarProdutos() {
    const repositoryResponse = await this.produtosRepository.listar()
    return repositoryResponse
  }
}