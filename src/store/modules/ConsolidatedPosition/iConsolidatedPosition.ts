interface IConsolidatedPositionCategory {
  nome: string
  valor: number
}

/*
  Novo serviço de posição consolidada:
    - Para o serviço "urlNamespace"/cotista/posicao/consolidado,
      utilizar esta interface abaixo
*/
export interface IConsolidatedPosition {
  categorias: IConsolidatedPositionCategory[]
  saldototal: number
}

/*
  Serviço antigo, foi trocado pelo serviço acima por questões de desempenho:
    - Para o serviço "urlNamespace"/cotistas/posicao-consolidada,
      utilizar esta interface abaixo
*/
export interface IConsolidatedPositionOld {
  categorias: IConsolidatedPositionCategory[]
  saldo_total: number
}
