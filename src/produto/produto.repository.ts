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

  async buscaCategoria(categoria: string): Promise<string | null> {
    const categoriasDeProdutosCadastrados: string[] = this.produtos.map(p => p.categoria)
    const categoriaNaLista = categoriasDeProdutosCadastrados.find(categoriaCadastrada => categoriaCadastrada === categoria)

    if (categoriaNaLista) return categoriaNaLista

    return null
  }

}