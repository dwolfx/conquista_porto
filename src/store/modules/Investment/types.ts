export const Types = {
  INVESTMENT_LIST_ADD_REQUEST: 'INVESTMENT_LIST_ADD_REQUEST',
  INVESTMENT_LIST_ADD_SUCCESS: 'INVESTMENT_LIST_ADD_SUCCESS',
  INVESTMENT_LIST_ADD_FAILURE: 'INVESTMENT_LIST_ADD_FAILURE',
}

export type IFundsList = {
  apelido: string
  aplicacao_cotizacao: string
  aplicacao_financeiro: string
  aplicao_liberada: boolean
  aplicao_minima: number
  categoria_arena: string
  fundo_ativo: boolean
  fundo_investidor_profissional: string
  fundo_investidor_qualificado: string
  hora_aplicacao: string
  id_carteira: number
  minimo_inicial: number
  nome_carteira: string
  nome_empresa: string
  nome_gestor: string
  perfil_risco: 'baixo' | 'medio-baixo' | 'medio' | 'medio-alto' | 'alto'
  perfil_risco_ordem: 1 | 2 | 3 | 4 | 5
  rentabil_fundo_12_meses: string
  rentabil_fundo_ano: string
  rentabil_fundo_mes: string
  resgate_cotizacao: string
  resgate_financeiro: string
  saldo_minimo: number
  taxa_administracao: number
  url_logo_gestor: string
}
