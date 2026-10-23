interface IProductCaracteristicas {
  nome: string
  descrição: string
}
interface IImagens {
  url: string
  descrição: string
}

export interface IProduct {
  nome: string
  descrição: string
  valor: number
  categoria: string
  dataCriacao: string
  dataAtualizacao: string
  caracteristicas: Array<IProductCaracteristicas>
  imagens: Array<IImagens>
}

export type IProductRequestBody = Omit<IProduct, 'dataAtualizacao' | 'dataCriacao'>
