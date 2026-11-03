import { Injectable } from "@nestjs/common"
import { UsuarioEntity } from "./usuario.entity.js"

@Injectable() //esse decorator torna a classe um provider, que pode se refrenciado em um modulo para que outras classes possam usar
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = []

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario)
    return usuario
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find(
      usuarioSalvo => usuarioSalvo.id === id
    );

    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }

    return possivelUsuario;
  }

  async listar() {
    return this.usuarios
  }

  async atualiza(id: string, novosDados: Partial<UsuarioEntity>) {
    const possivelUsuario = this.buscaPorId(id)

    Object.entries(novosDados).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return
      }
      //atualiza restante das props com exceção do id: nome, email e senha
      possivelUsuario[chave as keyof UsuarioEntity] = valor
    })


    return possivelUsuario


  }
  async remove(id: string) {
    const possivelUsuario = this.buscaPorId(id)

    this.usuarios = this.usuarios.filter(usuarios => usuarios.id !== possivelUsuario.id)


    return `Usuário ${possivelUsuario.nome} removido`


  }
}