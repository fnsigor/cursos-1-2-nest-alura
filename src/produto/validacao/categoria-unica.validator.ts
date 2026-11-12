import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ProdutoRepository } from "../produto.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({ async: true })//é obrigado a infomrar pra esse decorator que é async
export class CategoriaUnicaValidator implements ValidatorConstraintInterface {

  constructor(private produtoRepository: ProdutoRepository) { }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const categoriaExiste = await this.produtoRepository.buscaCategoria(value)

    return categoriaExiste == null
  }
}

export const CategoriaUnica = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: CategoriaUnicaValidator
    })
  }
}