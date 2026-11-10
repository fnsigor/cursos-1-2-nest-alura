import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsuarioController } from "./usuario.controller.js";
import { UsuarioRepository } from "./usuario.repository.js";
import { UsuarioEntity } from "./usuario.entity.js";
import { UsuarioService } from "./usuario.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  controllers: [UsuarioController],
  //em providers colocamos referencias de classes que quewremos que o nestjs gerencie. faz parte da feature dependency injection do nest
  //providers sao qualquer classe com o decorator @injectable
  providers: [UsuarioRepository, UsuarioService]
})

export class UsuarioModule { }