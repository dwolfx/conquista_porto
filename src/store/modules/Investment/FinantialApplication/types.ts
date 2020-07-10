import { IToast } from 'hooks/toast'

export const Types = {
  DATA_GET_REQUEST: 'FINANTIAL_APPLICATION_DATA_GET_REQUEST',
  DATA_GET_SUCCESS: 'FINANTIAL_APPLICATION_DATA_GET_SUCCESS',
  DATA_GET_FAILURE: 'FINANTIAL_APPLICATION_DATA_GET_FAILURE',
  IS_AWARE_OF_TERMS_DATA_GET_REQUEST: 'IS_AWARE_OF_TERMS_DATA_GET_REQUEST',
  IS_AWARE_OF_TERMS_DATA_GET_SUCCESS: 'IS_AWARE_OF_TERMS_DATA_GET_SUCCESS',
  IS_AWARE_OF_TERMS_DATA_GET_FAILURE: 'IS_AWARE_OF_TERMS_DATA_GET_FAILURE',
  ALIGNMENT_TERMS_DATA_GET_REQUEST: 'ALIGNMENT_TERMS_DATA_GET_REQUEST',
  ALIGNMENT_TERMS_DATA_GET_SUCCESS: 'ALIGNMENT_TERMS_DATA_GET_SUCCESS',
  ALIGNMENT_TERMS_DATA_GET_FAILURE: 'ALIGNMENT_TERMS_DATA_GET_FAILURE',
  DATA_POST_REQUEST: 'FINANTIAL_APPLICATION_DATA_POST_REQUEST',
  DATA_POST_SUCCESS: 'FINANTIAL_APPLICATION_DATA_POST_SUCCESS',
  DATA_POST_FAILURE: 'FINANTIAL_APPLICATION_DATA_POST_FAILURE',
}

interface IFinantialApplicationData {
  id_fundo: string
  data_operacao: string
}
export interface IGetFinantialApplicationData {
  data: IFinantialApplicationData
  onSuccess: (data: IGetFinantialApplicationDataResponse) => void
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
}

export interface IGetFinantialApplicationPayload {
  type: keyof typeof Types
  payload: IGetFinantialApplicationData
}

export interface IGetFinantialApplicationDataResponse {
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
      aviso_data_fundo: true
      aplicacao_liberada: true
      resgate_liberado: false
    }
    posicao_cotista_fundo: {
      saldo_atual: number
      data_historico: string
    }
    id_cotista: number
    saldo_conta: number
    aderente_fundo: true
    fechado_aplicacao: false
    data_prevista_cotizacao: string
    data_prevista_liquidacao: string
    data_operacao: string
  }
}

export interface IGetFinantialApplicationAction {
  type: keyof typeof Types
  payload: IGetFinantialApplicationDataResponse
}

export interface IGetIsAwareOfTermsData {
  data: {
    id_fundo: string
    data_operacao: string
    valor: number
    aceite_termo_adesao: 'N' | 'S'
  }
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
}

export interface IGetIsAwareOfTermsPayload {
  type: keyof typeof Types
  payload: IGetIsAwareOfTermsData
}

export interface IGetIsAwareOfTermsResponse {
  Message: {
    TipoCritica: string
    Mensagem: string
  }
  dados_para_aplicacao: {
    conta_grafica: {
      codigo_banco: string
      nome_banco: string
      agencia: string
      conta: string
      digito_conta: string
      nome: string
      cpf_cnpj: string
    }
  }
}
export interface IisAwareOfTermsAction {
  type: keyof typeof Types
  payload: IGetIsAwareOfTermsResponse
}

export interface IGetAlignmentTermsData {
  data: {
    data_operacao: string
    valor_bruto: number
    id_fundo: string
  }
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
  status_enquadramento: string
  nota_rating_cotista: number
  nota_rating_carteira: number
  fundos_desenquadrados: {
    fundo_desenquadrado: Array<IFund>
  }
}

export interface IAlignmentTermsAction {
  type: keyof typeof Types
  payload: IGetAlignmentTermsResponse
}

export interface IPostFinantialApplicationData {
  data: {
    id_fundo: string
    valor: number
    data: string
    ciencia_desenquadramento: 'N' | 'S'
  }
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
}

export interface IPostFinantialApplicationPayload {
  type: keyof typeof Types
  payload: IPostFinantialApplicationData
}

export interface IPostFinantialApplicationDataResponse {
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

export interface IPostFinantialApplicationAction {
  type: keyof typeof Types
  payload: IPostFinantialApplicationDataResponse
}
export interface IError {
  message: {
    tipo_critica: string
    mensagem: string
  }
}
export interface IState {
  suitabilityInfo: { data: Object }
  auth: Object
}
