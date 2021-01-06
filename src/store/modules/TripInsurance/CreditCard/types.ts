export const Types = {
  GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST:
    'GET_TRIP_INSURANCE_CREDIT_CARD_REQUEST',
  GET_TRIP_INSURANCE_CREDIT_CARD_SUCCESS:
    'GET_TRIP_INSURANCE_CREDIT_CARD_SUCCESS',
  GET_TRIP_INSURANCE_CREDIT_CARD_FAILURE:
    'GET_TRIP_INSURANCE_CREDIT_CARD_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: IPayload
}

export interface ICreditCard {
  Tipo: string
  Bandeira: string
  Fatura: {
    MelhorDataCompra: string
    Valor: string
    Vencimento: string
  }
  UltimosDigitos: string
  LimiteTitularCartao: {
    LimiteDisponivel: string
  }
}

export interface IMessage {
  TipoCritica: string
  Mensagem: string
}

export interface IPayload {
  Message?: IMessage
  creditCards?: ICreditCard[]
}
