import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto.js";
import { UsuarioEntity } from "./usuario.entity.js";
import { Repository } from "typeorm";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto.js";

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

  async criaUsuario(usuarioEntity: UsuarioEntity) {
    const novoUsuario = await this.usuarioRepository.save(usuarioEntity)
    return novoUsuario
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