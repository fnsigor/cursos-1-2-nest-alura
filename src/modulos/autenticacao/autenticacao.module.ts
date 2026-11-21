import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service.js';
import { AutenticacaoController } from './autenticacao.controller.js';
import { UsuarioModule } from '../../usuario/usuario.module.js';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService],
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: 'SEGREDO_SECRETO',
      signOptions: { expiresIn: '72h' },
    }),
  ]
})
export class AutenticacaoModule { }
