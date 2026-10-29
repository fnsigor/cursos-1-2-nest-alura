import { Injectable } from "@nestjs/common";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto.js";

@Injectable()
export class ProdutoRepository {
  private produtos: CriaProdutoDTO[] = []

  async salvar(produto: CriaProdutoDTO) {
    this.produtos.push(produto)
    return `Produto criado com sucesso`
  }

  async listar() {
    return this.produtos
  }

}