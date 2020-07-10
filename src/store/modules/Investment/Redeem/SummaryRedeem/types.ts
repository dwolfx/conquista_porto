import { IToast } from "hooks/toast";

export const Types = {
  REDEEM_SUMMARY_GET_DATA_REQUEST: 'REDEEM_SUMMARY_GET_DATA_REQUEST',
  REDEEM_SUMMARY_GET_DATA_SUCCESS: 'REDEEM_SUMMARY_GET_DATA_SUCCESS',
  REDEEM_SUMMARY_GET_DATA_FAILURE: 'REDEEM_SUMMARY_GET_DATA_FAILURE'
}

export interface IGetRedeemSummaryRequest {
  id_fundo: string
  data_operacao: string
  valor: string
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
}

export interface IGetRedeemSummaryRequestData {
  type: keyof typeof Types
  payload: IGetRedeemSummaryRequest
}

export interface IError {
  message: {
    tipo_critica: string
    mensagem: string
  }
}