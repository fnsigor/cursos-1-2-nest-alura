import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository.js";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto.js";

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtosRepository: ProdutoRepository) { }


  @Post()
  async criarProduto(@Body() requestBody: CriaProdutoDTO) {
    const repositoryResponse = await this.produtosRepository.salvar(requestBody)
    return repositoryResponse
  }

  @Get()
  async listarProdutos() {
    const repositoryResponse = await this.produtosRepository.listar()
    return repositoryResponse
  }
}