import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import type { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity) //cria um repositorio pra uma entidade
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) { }

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find()
    const usuariosLista = usuariosSalvos.map(usuario => {
      return new ListaUsuarioDTO(
        usuario.id,
        usuario.nome
      )
    })

    return usuariosLista
  }

  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity()

    usuarioEntity.email = dadosDoUsuario.email
    usuarioEntity.senha = dadosDoUsuario.senha
    usuarioEntity.nome = dadosDoUsuario.nome

    return this.usuarioRepository.save(usuarioEntity)
  }


  async deletaUsuario(usuarioId: string) {
    await this.usuarioRepository.softDelete(usuarioId)
  }

  async atualizaUsuario(id: string, usuarioAtualizado: AtualizaUsuarioDTO) {
    await this.usuarioRepository.update(id, usuarioAtualizado)
  }


  async buscaPorId(id: string) {
    const usuario = await this.usuarioRepository.findOneBy({
      id
    })

    return usuario
  }


}