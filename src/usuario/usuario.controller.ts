import { Body, Controller, Get, Post } from "@nestjs/common";
import type { IUsuario } from "./usuario.types.js";
import { UsuarioRepository } from "./usuario.repository.js";


@Controller('/usuarios')
export class UsuarioController {


  constructor(private usuarioRepository: UsuarioRepository) {

  }

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: IUsuario) {
    const response = await this.usuarioRepository.salvar(dadosDoUsuario)
    return response
  }


  @Get()
  async listarUsuarios() {
    const response = await this.usuarioRepository.listar()
    return { usuarios: response }
  }

}