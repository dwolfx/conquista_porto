export const Types = {
  GET_WITHDRAW_SUMMARY_REQUEST: 'GET_WITHDRAW_SUMMARY_REQUEST',
  GET_WITHDRAW_SUMMARY_SUCCESS: 'GET_WITHDRAW_SUMMARY_SUCCESS',
  GET_WITHDRAW_SUMMARY_FAILURE: 'GET_WITHDRAW_SUMMARY_FAILURE',
  GET_WITHDRAW_DETAILS_REQUEST: 'GET_WITHDRAW_DETAILS_REQUEST',
  GET_WITHDRAW_DETAILS_SUCCESS: 'GET_WITHDRAW_DETAILS_SUCCESS',
  GET_WITHDRAW_DETAILS_FAILURE: 'GET_WITHDRAW_DETAILS_FAILURE',
}

export interface IDetailsPayload {
  onSuccess?: (data?: any) => void
  onError?: (err?: any) => void
}

export interface IDetailsResponse {}

export interface ISummartPayload {
  data: { valor_operacao: number }
  onSuccess?: (data: ISummaryDataResponse) => void
  onError?: (err: any) => void
}

export interface ISummaryRequest {
  type: string
  payload: ISummartPayload
}

export interface IBank {
  id_conta: string
  codigo_banco: string
  nome_banco: string
  agencia: string
  conta: string
  digito_conta: string
  principal: string
}

export interface ISummaryDataResponse {
  conta_porto_seguro: {
    id_conta: string
    codigo_banco: string
    nome_banco: string
    agencia: string
    conta: string
    digito_conta: string
    titular: string
    saldo_disponivel: string
    encargos_acumulados: string
    cheque_especial: {
      limite: string
      data_vencimento: string
    }
    valores_bloqueados: {
      em_24horas: string
      em_48horas: string
      indeterminado: string
      judicial: string
    }
    saldo_liquidar: string
  }
  contas_liquidacao: {
    conta_liquidacao: IBank[]
  }
  data_solicitacao: string
  fechado_retirada: string
  hora_limite_retirada_ted: string
}
