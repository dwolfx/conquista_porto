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
}

export interface IOption {
  id: number | string
  name: string
}

export enum DocumentType {
  RG = 'RG',
  RNE = 'RNE',
  CNH = 'CNH',
  PASSPORT = 'Passaporte',
}

export type BrazilianState = {}

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
}

export interface IOrderResponse {
  codigoRetorno?: number,
  mensagem?: {
    mensagem?: string,
    tipoCritica?: string
  },
  numeroProposta?: number
}

export enum FLAGS {
  VISA = '1',
  MASTERCARD = '2'
}
