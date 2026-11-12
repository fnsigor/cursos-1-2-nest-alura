import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { criaUsuarioSchema, type CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { UsuarioService } from "./usuario.service";


@Controller('/usuarios')
export class UsuarioController {


  constructor(
    // private usuarioRepository: UsuarioRepository,
    private usuarioService: UsuarioService
  ) {

  }

  // @Get(':id')
  // async listarUsuariosId(@Param('id', ParseIntPipe) id: number) {
  //   const response = await this.usuarioRepository.listar()
  //   return { usuarios: response }
  // }

  @Post()
  async criaUsuario(@Body({ schema: criaUsuarioSchema }) dadosDoUsuario: CriaUsuarioDTO) {


    const usuarioCriado = await this.usuarioService.criaUsuario(dadosDoUsuario)
    return {
      usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
      messagem: 'usuário criado com sucesso',
    }
  }


  @Get()
  async listarUsuarios() {
    const usuarios = await this.usuarioService.listaUsuarios()
    return { usuarios }
  }



  @Put(':id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados)
    return {
      usuario: usuarioAtualizado,
      message: 'usuario atualizado com sucesso'
    }
  }
  @Delete(':id')
  async removeUsuario(@Param('id') id: string) {
    const mensagemUsuarioRemovido = await this.usuarioService.deletaUsuario(id)
    return {
      message: mensagemUsuarioRemovido
    }
  }

}