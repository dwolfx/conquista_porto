import { TFundsLayout } from 'pages/Investments/Management/types'
import { IFund } from 'store/modules/Investment/Position/iPositions'

export interface IBenchmark {
  nome: string
  id: string
}

export interface IComparativoHistRentabil {
  hist_rentabil_benchmark: {
    benchmark: IBenchmark
    rentabil_12_meses: string
    rentabil_24_meses: string
    rentabil_36_meses: string
    rentabil_Ano: string
    rentabil_dia: string
    rentabil_mes: string
    rentabil_mes_anteiror: string
  }
  hist_rentabil_fundo: {
    id_carteira: string
    rel_fundo_benchmark_12_meses: string
    rel_fundo_benchmark_24_meses: string
    rel_fundo_benchmark_36_meses: string
    rel_fundo_benchmark_ano: string
    rel_fundo_benchmark_dia: string
    rel_fundo_benchmark_mes: string
    rel_fundo_benchmark_mes_ant: string
    rentabil_12_meses: string
    rentabil_24_meses: string
    rentabil_36_meses: string
    rentabil_ano: string
    rentabil_dia: string
    rentabil_mes: string
    rentabil_mes_anteiror: string
  }
  data_referencia: string
}

export interface IAliquota {
  faixa: string
  valor: string
}

export interface IAliquotasIr {
  aliquota: IAliquota[]
}

// export interface IFund {
//   aliquotas_ir: IAliquotasIr
//   apelido: string
//   aplicacao_cotizacao: string
//   aplicacao_financeiro: string
//   aplicao_liberada: boolean
//   aplicao_minima: string
//   aviso_data_fundo: boolean
//   benchmark: IBenchmark
//   categoria_ambima: string
//   categoria_arena: string
//   classificacao: string
//   comparativo_hist_rentabil: IComparativoHistRentabil
//   contagem_dias_resgate: string
//   data_inicio: string
//   hora_aplicacao: string
//   hora_resgate: string
//   id_carteira: string
//   is_fundo_ativo: boolean
//   link_infor_desempenho: string
//   link_lamina: string
//   link_regulamento: string
//   link_termo_adesao: string
//   minimo_inicial: string
//   nome_carteira: string
//   nome_empresa: string
//   nome_gestor: string
//   perfil_risco: string
//   perfil_risco_ordem: string
//   regime_iof: string
//   resgate_cotizacao: string
//   resgate_financeiro: string
//   resgate_liberado: boolean
//   resgate_minimo: string
//   saldo_atual: string
//   saldo_minimo: string
//   taxa_administracao: string
//   taxa_performance: string
//   tipo_cota: string
//   url_logo_gestor: string
//   valor_patrimonio_liq: string
// }

export interface IInvestedFundsList {
  filters: any
  filteredFunds: IFund[]
  viewMode: TFundsLayout
  isNextPriorButtonsVisible: boolean
  onHandleChangeView: (newStateLayout: TFundsLayout) => void
  onHandleChangeFilter: (newStateFilters: string[]) => void
}

export interface IFundsCarousel {
  filteredFunds: IFund[]
  displayInformation: boolean
  idFund: number
  onHandleChangeIdFund: (idFund: number) => void
  setCount: (count: number) => void
}

export interface IChipProps {
  onClick: () => any
  selected: boolean
}

export interface IFundsList {
  filteredFunds: IFund[]
  idFund: string
  displayInformation: boolean
  onHandleChangeIdFund: (idFund: string) => void
}

export interface IFundItemProps {
  selected: boolean
  itemsLength: number
}
