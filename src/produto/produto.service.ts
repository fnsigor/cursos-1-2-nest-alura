import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity.js";
import { Repository } from "typeorm";

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ) { }



  async criaProduto(produtoEntity: ProdutoEntity) {
    const novoProduto = await this.produtoRepository.save(produtoEntity)
    return novoProduto
  }
}