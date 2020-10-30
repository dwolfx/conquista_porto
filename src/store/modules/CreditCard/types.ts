export const Types = {
  GET_REQUEST: 'CREDIT_CARD_GET_REQUEST',
  GET_SUCCESS: 'CREDIT_CARD_GET_SUCCESS',
  GET_FAILURE: 'CREDIT_CARD_GET_FAILURE',
  OPEN_CREDIT_CARD_CREATION: 'OPEN_CREDIT_CARD_CREATION',
  CLOSE_CREDIT_CARD_CREATION: 'CLOSE_CREDIT_CARD_CREATION',
}

interface ICreditCardInvoice {
  MelhorDataCompra: number
  Status: string
  Valor: number
  Vencimento: number
}

interface ICreditAdditionalCardLimit {
  LimiteCredito: number
  LimiteDisponivel: number
  LimiteDisponivelOverlimitt: number
  LimiteSaque: number
}

interface ICreditHolderCardLimit {
  LimiteCredito: number
  LimiteDisponivel: number
  LimiteDisponivelOverlimitt: number
  LimiteSaque: number
}

export interface ICreditCard {
  Bandeira: string
  CodigoCanal: number
  CpfCnpj: string
  Fatura: ICreditCardInvoice
  LimiteCartaoAdicional: ICreditAdditionalCardLimit
  LimiteTitularCartao: ICreditHolderCardLimit
  Link: string
  Tipo: string
  UltimosDigitos: number
}
