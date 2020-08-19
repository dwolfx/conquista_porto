import { IToast } from 'hooks/toast'

export const Types = {
  DATA_GET_REQUEST: 'FINANCIAL_APPLICATION_DATA_GET_REQUEST',
  DATA_GET_SUCCESS: 'FINANCIAL_APPLICATION_DATA_GET_SUCCESS',
  DATA_GET_FAILURE: 'FINANCIAL_APPLICATION_DATA_GET_FAILURE',
  ALIGNMENT_TERMS_DATA_GET_REQUEST: 'ALIGNMENT_TERMS_DATA_GET_REQUEST',
  ALIGNMENT_TERMS_DATA_GET_SUCCESS: 'ALIGNMENT_TERMS_DATA_GET_SUCCESS',
  ALIGNMENT_TERMS_DATA_GET_FAILURE: 'ALIGNMENT_TERMS_DATA_GET_FAILURE',
  DATA_POST_REQUEST: 'FINANCIAL_APPLICATION_DATA_POST_REQUEST',
  DATA_POST_SUCCESS: 'FINANCIAL_APPLICATION_DATA_POST_SUCCESS',
  DATA_POST_FAILURE: 'FINANCIAL_APPLICATION_DATA_POST_FAILURE',
  UPDATE_ADHESION_TERM: 'UPDATE_ADHESION_TERM',
}

interface IFinancialApplicationData {
  id_fundo: number
  data_operacao: string
}
export interface IGetFinancialApplicationData {
  data: IFinancialApplicationData
  onSuccess: (data: IGetFinancialApplicationDataResponse) => void
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
}

export interface IGetFinancialApplicationPayload {
  type: keyof typeof Types
  payload: IGetFinancialApplicationData
}

export interface IGetFinancialApplicationDataResponse {
  Message: {
    TipoCritica: string
    Mensagem: string
  }
  dados_para_aplicacao: {
    fundo: {
      id_carteira: number
      apelido: string
      nome_carteira: string
      perfil_risco: string
      data_inicio: string
      minimo_inicial: number
      aplicacao_minima: number
      resgate_minimo: number
      saldo_minimo: number
      hora_aplicacao: string
      hora_resgate: string
      aplicacao_cotizacao: string
      aplicacao_financeiro: string
      resgate_cotizacao: string
      resgate_financeiro: string
      categoria_arena: string
      taxa_administracao: number
      taxa_performance: number
      classificacao: string
      link_termo_adesao: string
      tipo_cota: string
      aviso_data_fundo: boolean
      aplicacao_liberada: boolean
      resgate_liberado: boolean
    }
    posicao_cotista_fundo: {
      saldo_atual: number
      data_historico: string
    }
    id_cotista: number
    saldo_conta: number
    aderente_fundo: boolean
    fechado_aplicacao: boolean
    data_prevista_cotizacao: string
    data_prevista_liquidacao: string
    data_operacao: string
  }
}

export interface IGetFinancialApplicationAction {
  type: keyof typeof Types
  payload: IGetFinancialApplicationDataResponse
}

export interface IGetAlignmentTermsData {
  data: {
    data_operacao: string
    valor_bruto: number
    id_fundo: number
  }
  onSuccess: (data: IGetAlignmentTermsResponse) => void
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
}

export interface IGetAlignmentTermsPayload {
  type: keyof typeof Types
  payload: IGetAlignmentTermsData
}

interface IFund {
  id_carteira: number
  nome_fundo: string
  nota_rating: number
}

export interface IGetAlignmentTermsResponse {
  enquadramento_ordem_cotista: {
    status_enquadramento: string
    nota_rating_cotista: number
    nota_rating_carteira: number
    fundos_desenquadrados: {
      fundo_desenquadrado: Array<IFund>
    }
  }
}

export interface IAlignmentTermsAction {
  type: keyof typeof Types
  payload: IGetAlignmentTermsResponse
}

export interface IPostFinancialApplicationData {
  data: {
    id_fundo: number
    valor: number
    data: string
    ciencia_desenquadramento: 'N' | 'S'
  }
  onSuccess: () => void
  onError: () => void
}

export interface IPostFinancialApplicationPayload {
  type: keyof typeof Types
  payload: IPostFinancialApplicationData
}

export interface IPostFinancialApplicationDataResponse {
  Message: {
    TipoCritica: string
    Mensagem: string
  }
  status_operacao: boolean
  mesagem: string
  id_cotista: number
  cpf_cnpj: string
  valor: number
  data: string
  id_fundo: number
}

export interface IPostFinancialApplicationAction {
  type: keyof typeof Types
  payload: IPostFinancialApplicationDataResponse
}

export interface IError {
  message: {
    tipo_critica: string
    mensagem: string
  }
}

export interface IState {
  suitabilityInfo: { data: Object }
  financialApplicationGetData: { data: Object }
  auth: Object
}
