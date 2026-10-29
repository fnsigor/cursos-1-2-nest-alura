import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository.js";
import { criaUsuarioSchema, type CriaUsuarioDTO } from "./dto/CriaUsuario.dto.js";
import { ZodValidationPipe } from "../lib/zod.js";



@Controller('/usuarios')
export class UsuarioController {


  constructor(private usuarioRepository: UsuarioRepository) {

  }

  @Post()
  @UsePipes(new ZodValidationPipe(criaUsuarioSchema))
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const response = await this.usuarioRepository.salvar(dadosDoUsuario)
    return response
  }


  @Get()
  async listarUsuarios() {
    const response = await this.usuarioRepository.listar()
    return { usuarios: response }
  }
  @Get(':id')
  async listarUsuariosId(@Param('id', ParseIntPipe) id: number) {
    const response = await this.usuarioRepository.listar()
    return { usuarios: response }
  }

}