import { IToast } from 'hooks/toast'

export const Types = {
  DATA_TERMS_REQUEST: 'DATA_TERMS_REQUEST',
  DATA_TERMS_SUCCESS: 'DATA_TERMS_SUCCESS',
  DATA_TERMS_FAILURE: 'DATA_TERMS_FAILURE'
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
    valor_bruto: number
    id_fundo: string
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
