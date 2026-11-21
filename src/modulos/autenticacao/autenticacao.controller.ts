import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service.js';
import { AutenticaDTO } from './dto/autentica.dto.js';

@Controller('auth')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) { }

  @Post('login')
  login(@Body() credenciais: AutenticaDTO) {

    console.log(credenciais)
    return this.autenticacaoService.login(credenciais);
  }


}
