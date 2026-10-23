import { Injectable } from "@nestjs/common"
import type { IUsuario } from "./usuario.types.js"

@Injectable() //esse decorator torna a classe um provider, que pode se refrenciado em um modulo para que outras classes possam usar
export class UsuarioRepository {
  private usuarios: IUsuario[] = []

  async salvar(usuario: IUsuario) {
    this.usuarios.push(usuario)
    return 'Usuário salvo'
  }

  async listar() {
    return this.usuarios
  }
}