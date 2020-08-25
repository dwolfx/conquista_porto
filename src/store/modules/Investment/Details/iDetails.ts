export interface IAliquota {
  faixa: string
  valor: string
}

export interface IFundDetails {
  minimo_inicial: string
  aplicao_minima: string
  saldo_minimo: string
  hora_aplicacao: string
  aplicacao_cotizacao: string
  aplicacao_financeiro: string
  contagem_dias_resgate: string
  resgate_cotizacao: string
  resgate_financeiro: string
  categoria_arena: string
  perfil_risco: string
  classificacao: string
  aliquotas_ir: IAliquota[]
  regime_iof: string
}
