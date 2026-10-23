import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller.js";
import { UsuarioRepository } from "./usuario.repository.js";

@Module({
  controllers: [UsuarioController],
  //em providers colocamos referencias de classes que quewremos que o nestjs gerencie. faz parte da feature dependency injection do nest
  //providers sao qualquer classe com o decorator @injectable
  providers: [UsuarioRepository]
})

export class UsuarioModule { }