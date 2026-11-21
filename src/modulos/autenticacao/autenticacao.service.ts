import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AutenticaDTO } from './dto/autentica.dto.js';
import { UsuarioService } from '../../usuario/usuario.service.js';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
}

@Injectable()
export class AutenticacaoService {

  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) { }

  async login(credenciais: AutenticaDTO) {
    const usuario = await this.usuarioService.buscaPorEmail(credenciais.email)

    const usuarioFoiAutenticado = bcrypt.compare(credenciais.senha, usuario.senha)

    if (!usuarioFoiAutenticado) throw new UnauthorizedException('Credenciais invalidas');

    console.log('user autenticado')

    const payload: UsuarioPayload = {
      sub: usuario.id, // subject = sujeito
      nomeUsuario: usuario.nome,
    };

    return {
      token_acesso: await this.jwtService.signAsync(payload),
    };

  }
}
