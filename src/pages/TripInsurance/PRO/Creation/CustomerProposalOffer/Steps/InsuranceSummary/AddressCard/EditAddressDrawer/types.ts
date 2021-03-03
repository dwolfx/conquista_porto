export interface IAddressDrawer {
  isOpen: boolean
  handleClose: () => void
}

export interface IFormAddress {
  cep: boolean
  streetAddress: boolean
  neighbourhood: boolean
  number: boolean
  city: boolean
  stateOption: boolean
}

export type EAddressForm =
  | 'tipo'
  | 'logradouro'
  | 'bairro'
  | 'cidade'
  | 'uf'
  | 'complemento'
  | 'numero'
  | 'numeroCep'
  | 'complementoCep'

export interface IPassengerAddress {
  tipo?: string
  logradouro?: string
  bairro?: string
  cidade?: string
  uf?: string
  complemento?: string
  numero?: string
  numeroCep?: string
  complementoCep?: string
}
