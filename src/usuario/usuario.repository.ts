import { Injectable } from "@nestjs/common"
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto.js"

@Injectable() //esse decorator torna a classe um provider, que pode se refrenciado em um modulo para que outras classes possam usar
export class UsuarioRepository {
  private usuarios: CriaUsuarioDTO[] = []

  async salvar(usuario: CriaUsuarioDTO) {
    this.usuarios.push(usuario)
    return 'Usuário salvo'
  }

  async listar() {
    return this.usuarios
  }
}