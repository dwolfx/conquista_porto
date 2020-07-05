export default interface IPositions {
  distribuicoes: IPosition[]
}

export interface IPosition {
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
  fundo: string
  nome_gestor: string
  saldoBruto: string
  saldoLiquido: string
  valor_ir: string
  valor_iof: string
  valor_cota: string
  aplicao_minima: number
  quantidade_cota: number
  dias_conversao_aplicacao: number
  dias_liquidacao_aplicacao: number
  dias_conversao_resgate: number
  dias_liquidacao_resgate: number
  contagem_dias_resgate: string
  perfil_risco: number
  data_historico: string
  data_historico_formatada: string
  pdf_informativo_desempenho: string
  pdf_regulamento: string
  saldo_bruto_numerico: number
}
