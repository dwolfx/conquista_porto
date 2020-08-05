import { IToast } from 'hooks/toast'

export const Types = {
  REDEEM_TERMS_DATA_REQUEST: 'REDEEM_TERMS_DATA_REQUEST',
  REDEEM_TERMS_DATA_SUCCESS: 'REDEEM_TERMS_DATA_SUCCESS',
  REDEEM_TERMS_DATA_FAILURE: 'REDEEM_TERMS_DATA_FAILURE',
}

export interface IGetRedeemAlignmentTermsPayload {
  type: keyof typeof Types
  payload: IGetRedeemAlignmentTermsData
}

export interface IGetRedeemAlignmentTermsAction {
  type: keyof typeof Types
  payload: IGetRedeemAlignmentTermsResponse
}

export interface IGetRedeemAlignmentTermsData {
  data: {
    data_operacao: string
    valor_bruto: string
    id_fundo: number
  }
  onSuccess: (data: IGetRedeemAlignmentTermsResponse) => void
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
}

interface IFund {
  id_carteira: number
  nome_fundo: string
  nota_rating: number
}
export interface IGetRedeemAlignmentTermsResponse {
  enquadramento_ordem_cotista: {
    status_enquadramento: string
    nota_rating_cotista: number
    nota_rating_carteira: number
    fundos_desenquadrados: {
      fundo_desenquadrado: Array<IFund>
    }
  }
}
