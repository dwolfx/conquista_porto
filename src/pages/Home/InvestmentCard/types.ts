export interface IInvestmentCard {
  onFetchInvestments: () => void
  headerEndItem?: React.ReactNode
}

export interface IInvestmentErrorStateCard {
  onRetry: () => void
}

interface ICategoria {
  nome: string
  valor: number
}

export interface IDataConsolidatedPosition {
  saldo_total: number
  categorias?: ICategoria[]
}

export interface IConsolidatedPositionState {
  consolidatedPosition: {
    data: IDataConsolidatedPosition
    isLoading: boolean
    hasError: boolean
  }
}

export interface IBankDataState {
  bankData: {
    data: {
      DadosContaPortoSeguro: {
        agencia: string
        cheque_especial: {
          limite: string
          data_vencimento: string
        }
        codigo_banco: string
        conta: string
        cpf: string
        digito_conta: string
        encargos_acumulados: string
        id_conta: string
        nome_banco: string
        saldo_disponivel: string
        saldo_liquidar: string
        titular: string
        valores_bloqueados: {
          em_24horas: string
          em_48horas: string
          indeterminado: string
          judicial: string
        }
      }
      UltimasOperacoes: {
        transacoes: {
          transacao: [
            {
              data: string
              tipo: string
              valor: string
            }
          ]
        }
      }
    }
    isLoading: boolean
    hasError: boolean
    status: string
  }
}

export interface ISuitabilityInfoState {
  suitabilityInfo: {
    data: {
      CotistaContaOrdemPortoPar: string
      codigo_status_cotista: string
      id_cotista: string
      investidor_profissional: string
      investidor_qualificado: string
      isValid: boolean
      status_cotista: boolean
      status_data_vencimento_cadastro: boolean
      status_data_vigencia_suitability: boolean
      status_possui_suitability: boolean
    }
    isLoading: boolean
    hasError: boolean
    status: string
  }
}

export interface IPieChartInfoState {
  id?: number
  label?: string
  value: number
  percent: number
}

export interface IModalTextWrapper {
  margin?: string
}

export interface IModalAccountPortoInfo {
  isOpen: boolean
  onChangeModalOpen: Function
  bankData?: {
    DadosContaPortoSeguro: {
      titular: string
      cpf: string
      saldo_disponivel: string
      digito_conta: string
      conta: string
      codigo_banco: string
      nome_banco: string
      agencia: string
    }
  }
}

export interface IGraphValuesResult {
  color: string
  id: string
  label: string
  percent: string
  value: number
}
