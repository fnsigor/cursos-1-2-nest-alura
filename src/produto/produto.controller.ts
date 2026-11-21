import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { AtualizaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoService } from './produto.service';
import { CACHE_MANAGER, CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ProdutoEntity } from './produto.entity';
import { AutenticacaoGuard } from '../modulos/autenticacao/autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)//um guard no controler afeta todas as rotas
@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoRepository: ProdutoRepository,
    private readonly produtoService: ProdutoService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) { }

  @Post()
  //@UseGuards(AutenticacaoGuard) um guard numa rota afeta só a rota
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = await this.produtoService.criaProduto(
      dadosProduto,
    );

    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    };
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 500)
  async listaTodos() {
    console.log('lista buscada no banco')
    return this.produtoService.listaTodos();
  }

  @Get('/:id')
  async buscaPorId(@Param('id') id: string) {

    let produto = await this.cacheManager.get<ProdutoEntity>(`produto-${id}`)

    if (!produto) {
      console.log('Obtendo produto do cache!');
      produto = await this.produtoService.buscaPorId(id);
      await this.cacheManager.set(`produto-${id}`, produto);
    }

    return { mensagem: 'produto achado', produto };
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoRepository.atualiza(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}