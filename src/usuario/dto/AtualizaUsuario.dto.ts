import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator"

export class AtualizaUsuarioDTO {

  @IsNotEmpty({ message: 'nome nao pode ser vazio' })
  @IsOptional()
  nome: string



  @IsEmail(undefined, { message: 'email invalido' })
  @IsOptional()
  email: string




  @MinLength(6, { message: 'a senha precisa ter no minimo 6 caracteres' })
  @IsOptional()
  senha: string
}