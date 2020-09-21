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
