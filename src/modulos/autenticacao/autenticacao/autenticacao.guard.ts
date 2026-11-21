import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IncomingMessage } from 'http';
import { UsuarioPayload } from '../autenticacao.service';

export interface RequisicaoComUsuario extends IncomingMessage {
  usuario: UsuarioPayload;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {


  constructor(private jwtService: JwtService) { }


  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<RequisicaoComUsuario>()
    const token = this.extrairTokenDoCabecalho(request)

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação')
    }

    try {

      const payload: UsuarioPayload = await this.jwtService.verifyAsync(token)
      request.usuario = payload
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('JWT Inválido')
    }

    return true;


  }

  private extrairTokenDoCabecalho(request: IncomingMessage): string | undefined {


    const [tipo, token] = request.headers.authorization?.split(' ') ?? []

    console.log({ auth: [tipo, token] })

    return tipo === 'Bearer' ? token : undefined
  }
}
