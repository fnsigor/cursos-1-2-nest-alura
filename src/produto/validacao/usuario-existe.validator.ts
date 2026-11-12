import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UsuarioService } from "../../usuario/usuario.service";

@Injectable()
@ValidatorConstraint({ async: true })//é obrigado a infomrar pra esse decorator que é async
export class UsuarioExisteValidator implements ValidatorConstraintInterface {

  constructor(private usuarioService: UsuarioService) { }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {

    console.log({ value })

    const usuario = await this.usuarioService.buscaPorId(value)

    console.log({ usuario })

    const usuarioExiste = usuario !== null

    return usuarioExiste
  }
}

export const UsuarioExiste = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: UsuarioExisteValidator
    })
  }
}