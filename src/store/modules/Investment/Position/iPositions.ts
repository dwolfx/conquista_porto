export default interface IPosition {
  distribuicoes: IDistribution[]
}

export interface IDistribution {
  id: number
  nome: string
  total: string
  porcentagem: number
  fundos: IFund[]
  totalNumerico: number
}

export interface IFund {
  id: number
  id_cotista: number
  apelido: string
  contagem_dias_resgate: string
  aplicacao_cotizacao: string
  aplicacao_financeiro: string
  resgate_cotizacao: string
  resgate_financeiro: string
  categoria_arena: string
  saldo_minimo: number
  resgate_minimo: number
  resgate_liberado: boolean
  saldo_bloqueado: number
  aplicao_minima: number
  aplicao_liberada: boolean
  nome_gestor: string
  fundo: string
  saldo_bruto: string
  saldo_liquido: string
  valor_ir: string
  valor_iof: string
  valor_cota: string
  quantidade_cota: number
  perfil_risco_ordem: number
  data_historico: string
  data_historico_formatada: string
  pdf_informativo_desempenho: string
  pdf_regulamento: string
  saldo_bruto_numerico: number
  perfil_risco: string
}
