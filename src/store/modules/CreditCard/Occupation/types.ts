export enum Types {
  CREDIT_CARD_OCCUPATION_REQUEST = "CREDIT_CARD_OCCUPATION_REQUEST",
  CREDIT_CARD_OCCUPATION_SUCCESS = "CREDIT_CARD_OCCUPATION_SUCCESS",
  CREDIT_CARD_OCCUPATION_FAILURE = "CREDIT_CARD_OCCUPATION_FAILURE",
}

export interface Occupation {
  codUsuarioAlteracao: string
  codProfissaoProduto: string
  dataInclusao: string
  nome: string
  dataAlteracao: string
  codProduto: string
}

export interface IResponse {
  descricaoErro: string
  profissoesVO: Occupation[]
  codigoErro: string
}
