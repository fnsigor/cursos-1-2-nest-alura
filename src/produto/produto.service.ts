import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ) { }



  async criaProduto(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.usuarioId = dadosProduto.usuarioId;
    produtoEntity.valor = dadosProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosProduto.descricao;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.caracteristicas = dadosProduto.caracteristicas;
    produtoEntity.imagens = dadosProduto.imagens;

    return this.produtoRepository.save(produtoEntity);
  }

  async listaTodos() {
    return this.produtoRepository.find();
  }

  async buscaPorId(id: string) {
    const produto = await this.produtoRepository.findOneBy({ id });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }
}
