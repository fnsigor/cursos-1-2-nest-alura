import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsuarioController } from "./usuario.controller";
import { UsuarioRepository } from "./usuario.repository";
import { UsuarioEntity } from "./usuario.entity";
import { UsuarioService } from "./usuario.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  //em providers colocamos referencias de classes que quewremos que o nestjs gerencie. faz parte da feature dependency injection do nest
  //providers sao qualquer classe com o decorator @injectable
  providers: [UsuarioRepository, UsuarioService],
  exports: [UsuarioService]
  //para que algum provider (qualquer classe com Injectable()) de um modulo seja reutilizado em outro modulo
  //no modulo de origem do provider, esse provder deve ser colocado na array de exports
  //o outro modulo vai importar o provider exportado colocado na array de imports
})

export class UsuarioModule { }