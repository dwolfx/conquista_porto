import { IToast } from 'hooks/toast'

export const Types = {
  REDEEM_DATA_GET_REQUEST: 'REDEEM_DATA_GET_REQUEST',
  REDEEM_DATA_GET_SUCCESS: 'REDEEM_DATA_GET_SUCCESS',
  REDEEM_DATA_GET_FAILURE: 'REDEEM_DATA_GET_FAILURE',
  REDEEM_LAYER_OPEN: 'REDEEM_LAYER_OPEN',
  REDEEM_LAYER_CLOSE: 'REDEEM_LAYER_CLOSE',
}

export interface IGetRedeemRequest {
  id_fundo: number
  data_operacao: string
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
  onSuccess?: () => void
}

export interface IGetRedeemRequestData {
  type: keyof typeof Types
  payload: IGetRedeemRequest
}
export interface IGetRedeemResponse {
  Message: {
    tipo_critica: string
    mensagem: string
  }
  dados_para_resgate: {
    data_operacao: string
    hora_limite: string
    posicao_cotista_fundo: {
      data_historico: string
      saldo_atual: string
    }
    data_prevista_liquidacao: string
    fundo: {
      data_inicio: string
      taxa_performace: string
      apelido: string
      nome_carteira: string
      minimo_inicial: string
      perfil_risco: string
      hora_resgate: string
      resgate_coatizacao: string
      aplicacao_liberada: boolean
      aplicacao_minima: string
      tipo_cota: string
      hora_aplicacao: string
      resgate_financeiro: string
      aviso_data_fundo: boolean
      link_termo_adesao: string
      resgate_minimo: string
      saldo_minimo: string
      categoria_arena: string
      resgate_liberado: boolean
      taxa_administracao: string
      aplicacao_cotizacao: string
      id_carteira: number
      classificacao: string
      aplicacao_financeiro: string
    }
    fechado_resgate: boolean
    data_prevista_conversão: string
  }
}

export interface IGetRedeemRequestAction {
  type: keyof typeof Types
  payload: IGetRedeemResponse
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
