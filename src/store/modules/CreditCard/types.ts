import { IToast } from 'hooks/toast'

export const Types = {
  GET_REQUEST: 'CREDIT_CARD_GET_REQUEST',
  GET_SUCCESS: 'CREDIT_CARD_GET_SUCCESS',
  GET_FAILURE: 'CREDIT_CARD_GET_FAILURE',
  OPEN_CREDIT_CARD_CREATION: 'OPEN_CREDIT_CARD_CREATION',
  CLOSE_CREDIT_CARD_CREATION: 'CLOSE_CREDIT_CARD_CREATION',
  GET_CLIENT_DATA_REQUEST: 'CREDIT_CARD_GET_CLIENT_DATA_REQUEST',
  GET_CLIENT_DATA_SUCCESS: 'CREDIT_CARD_GET_CLIENT_DATA_SUCCESS',
  GET_CLIENT_DATA_FAILURE: 'CREDIT_CARD_GET_CLIENT_DATA_FAILURE',
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

export interface ICreditCardClientDataRequest {
  type: keyof typeof Types
  onSuccess?: (data?: ICreditCardClientData) => void
  onError?: () => void
  addToast?: (toast: Omit<IToast, 'id'>) => void
}

export interface ICreditCardClientData {
  cep: string
  codigoEstadoCivil: number
  cpfCnpj: string
  dataExpedicao: string
  dataNascimento: string
  dddNumeroTelefone: number
  emailCliente: string
  estado: string
  message: {
    mensagem: string
    tipoCritica: string
  }
  nomeCliente: string
  nomeMae: string
  numeroDocumento: number
  numeroEnderecoResidencial: number
  numeroTelefone: number
  orgaoEmissor: string
  sexo: string
  tipoDocumento: string
}

export interface ICreditCardState {
  data: any
  hasError: boolean
  isLoading: boolean
  isCreationLayerOpen: boolean
  clientData: ICreditCardClientData | null
  isClientDataLoading: boolean
  hasClientDataError: boolean
}
