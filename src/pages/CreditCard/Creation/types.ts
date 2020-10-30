import { Dispatch, SetStateAction } from 'react'

export interface IForm {}

export interface IStepComponent {
  form: {}
  onChangeForm: Dispatch<SetStateAction<{}>>
  onNextStep: () => void
}

export interface IOption {
  id: number
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
  codigoBandeira?: number
  codigoCanal?: number
  codigoEstadoCivil?: number
  codigoProfissao?: number
  complemento?: string
  dataEmissaoDocumento?: string
  dataNascimento?: string
  dddTelefone?: number
  diaVencimento?: number
  email?: string
  idSimulacao?: number
  logradouro?: string
  nacionalidade?: string
  nome?: string
  nomeMae?: string
  numeroDocumentoIdentificacao?: number
  numeroLogradouro?: number
  numeroTelefone?: number
  orgaoExpedidor?: string
  sexo?: string
  tipoDocumento?: string
  uf?: string
  valorRenda?: number
}
