import { Injectable } from "@nestjs/common";
import type { IProduct } from "./product.types.js";

@Injectable()
export class ProdutoRepository {
  private produtos: IProduct[] = []

  async salvar(produto: IProduct) {
    this.produtos.push(produto)
    return `Produto criado com sucesso`
  }

  async listar() {
    return this.produtos
  }

}