import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository.js";
import { criaUsuarioSchema, type CriaUsuarioDTO } from "./dto/CriaUsuario.dto.js";
import { ZodValidationPipe } from "../lib/zod.js";
import { UsuarioEntity } from "./usuario.entity.js";
import { randomUUID } from "crypto";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto.js";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto.js";



@Controller('/usuarios')
export class UsuarioController {


  constructor(private usuarioRepository: UsuarioRepository) {

  }

  @Post()
  @UsePipes(new ZodValidationPipe(criaUsuarioSchema))
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {


    const usuarioEntity = new UsuarioEntity()
    usuarioEntity.nome = dadosDoUsuario.nome
    usuarioEntity.email = dadosDoUsuario.email
    usuarioEntity.senha = dadosDoUsuario.senha
    usuarioEntity.id = randomUUID()

    const response = await this.usuarioRepository.salvar(usuarioEntity)
    return {
      usuario: new ListaUsuarioDTO(response.id, response.nome)
    }
  }


  @Get()
  async listarUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.listar()
    const listaDeUsuariosFormatada = usuariosSalvos.map(usuario => {
      return new ListaUsuarioDTO(
        usuario.id, usuario.nome
      )
    })
    return { usuarios: listaDeUsuariosFormatada }
  }
  @Get(':id')
  async listarUsuariosId(@Param('id', ParseIntPipe) id: number) {
    const response = await this.usuarioRepository.listar()
    return { usuarios: response }
  }


  @Put(':id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioRepository.atualiza(id, novosDados)
    return {
      usuario: usuarioAtualizado,
      message: 'usuario atualizado com sucesso'
    }
  }
  @Delete(':id')
  async removeUsuario(@Param('id') id: string) {
    const mensagemUsuarioRemovido = await this.usuarioRepository.remove(id)
    return {
      message: mensagemUsuarioRemovido
    }
  }

}