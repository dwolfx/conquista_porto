export const Types = {
  CREDIT_CARD_EXPIRATION_DAYS_REQUEST: "CREDIT_CARD_EXPIRATION_DAYS_REQUEST",
  CREDIT_CARD_EXPIRATION_DAYS_SUCCESS: "CREDIT_CARD_EXPIRATION_DAYS_SUCCESS",
  CREDIT_CARD_EXPIRATION_DAYS_FAILURE: "CREDIT_CARD_EXPIRATION_DAYS_FAILURE",
  CREDIT_CARD_EXPIRATION_DAYS_CLEAR_DATA: "CREDIT_CARD_EXPIRATION_DAYS_CLEAR_DATA"
}

type TFlag = {
  codBandeira: string,
  bandeira: string,
  descricao: string
}
export interface ICreditCardExpirationDays {
  codRetorno: string
  bandeiras: Array<TFlag>
  msgRetorno: string
  visa?: Array<TFlag>
  mastercard?: Array<TFlag> 
}