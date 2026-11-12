import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()


export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  listaTodos() {
    return this.produtos;
  }

  salva(dadosProduto: ProdutoEntity) {
    this.produtos.push(dadosProduto);
    return dadosProduto;
  }

  private buscaPorId(id: string) {
    const possivelProduto = this.produtos.find((produto) => produto.id === id);

    if (!possivelProduto) {
      throw new Error('Produto não existe');
    }

    return possivelProduto;
  }
  async atualiza(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];

    const produto = this.buscaPorId(id);

    const dadosAtualizaveis = Object.fromEntries(
      Object.entries(dadosProduto).filter(
        ([chave]) => !dadosNaoAtualizaveis.includes(chave),
      ),
    );

    Object.assign(produto, dadosAtualizaveis);

    return produto;
  }
  async remove(id: string) {
    const produtoRemovido = this.buscaPorId(id);
    this.produtos = this.produtos.filter((produto) => produto.id !== id);
    return produtoRemovido;
  }


  async buscaCategoria(nomeCategoria: string) {
    const listaDeCategorias: string[] = this.produtos.map(p => p.categoria)
    const categoria = listaDeCategorias.find((categoriaNaLista) => categoriaNaLista === nomeCategoria);
    if (!categoria) return null
    return categoria
  }
}