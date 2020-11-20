import { ICreditCardState } from 'store/modules/CreditCard/types'

export enum EInputsLabel {
  'email' = 'E-MAIL',
  'numeroDocumentoIdentificacao' = 'CPF',
  'dataNascimento' = 'DATA DE NASCIMENTO',
  'numeroTelefone' = 'CELULAR',
}

export type TEnumKeys =
  | 'email'
  | 'numeroDocumentoIdentificacao'
  | 'dataNascimento'
  | 'numeroTelefone'

export type TCustomerData = {
  [key in TEnumKeys]: string
}

export interface IFirstStep {
  onNextStep: () => void
}

export interface ICustomerProfile {
  customerProfile: {
    data: {
      customerEmail: string
      cpfCnpj: string
      customerBirthdate: string
      customerAreaCode: string
      customerPhoneNumber: string
    }
  }
}

export interface IState {
  creditCard: ICreditCardState
}
