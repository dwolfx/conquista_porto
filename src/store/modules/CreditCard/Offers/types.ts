import { IToast } from 'hooks/toast'

export const Types = {
  GET_CREDIT_CARD_OFFERS_REQUEST: 'GET_CREDIT_CARD_OFFERS_REQUEST',
  GET_CREDIT_CARD_OFFERS_SUCCESS: 'GET_CREDIT_CARD_OFFERS_SUCCESS',
  GET_CREDIT_CARD_OFFERS_FAILURE: 'GET_CREDIT_CARD_OFFERS_FAILURE',
}

export interface ICreditCardOfferRequest {
  type: keyof typeof Types
  onSuccess: (data: ICreditCardOffer) => void
  dataNasc: string
  nome: string
  uf: string
  addToast: (toast: Omit<IToast, 'id'>) => void
}
export interface ICreditCardOffer {
  CodigoOferta: string
  MensagemOferta: string
  IdSimulacao: string
  CodigoRetorno: string
  Message: {
    TipoCritica: string
  }
  isMasterCardActive?: boolean
  isVisaActive?: boolean
}

export interface ICreditCardOfferError {
  Message: {
    Mensagem: string
    TipoCritica: string
  }
}

export enum OFFER_CODE {
  ONLY_VISA_CODE = '1',
  ONLY_MASTER_CODE = '2',
  BOTH_FLAGS_AVAILABLE = '3',
  NO_FLAGS_AVAILABLE = '4',
}
