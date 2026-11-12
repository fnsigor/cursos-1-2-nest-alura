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
  providers: [UsuarioRepository, UsuarioService]
})

export class UsuarioModule { }