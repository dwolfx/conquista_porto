import { Dispatch, SetStateAction } from 'react'
import { ICreditCardState } from 'store/modules/CreditCard/types'

export interface IState {
  creditCard: ICreditCardState
}

export interface IStepComponent {
  formData: ICreditCardCreationPayload
  onNextStep: (stepAnswers: ICreditCardCreationPayload) => void
}

export interface ISummaryStep {
  formData: ICreditCardCreationPayload
  setFormData: Dispatch<SetStateAction<ICreditCardCreationPayload>>
  onSubmit: () => void
  retrySubmit: boolean
}

export interface IOption {
  id: number | string
  name: string
}

export enum DocumentType {
  RG = 'RG',
  RNE = 'RNE',
  CNH = 'CNH',
  CLASSE = 'Classe',
}

export interface ICreditCardCreationPayload {
  bairro?: string
  cep?: string
  cidade?: string
  codigoBandeira?: string
  codigoCanal?: string
  codigoEstadoCivil?: string
  codigoProfissao?: string
  complemento?: string
  dataEmissaoDocumento?: string
  dataNascimento?: string
  dddTelefone?: string
  diaVencimento?: string
  email?: string
  idSimulacao?: string
  logradouro?: string
  nacionalidade?: string
  nome?: string
  nomeMae?: string
  numeroDocumentoIdentificacao?: string
  numeroLogradouro?: string
  numeroTelefone?: string
  orgaoExpedidor?: string
  sexo?: string
  tipoDocumento?: string
  uf?: string
  valorRenda?: string
  cpf?: string
  estado?: string
}

export interface IOrderResponse {
  codigoRetorno?: number
  mensagem?: {
    mensagem?: string
    tipoCritica?: string
  }
  numeroProposta?: number
}

export enum FLAGS {
  VISA = '1',
  MASTERCARD = '2',
}

export interface CEPResponse {
  bairro: string
  cep: string
  cidade: string
  complementoCep: string
  logradouro: string
  tipoLogradouro: string
  uf: string
}
