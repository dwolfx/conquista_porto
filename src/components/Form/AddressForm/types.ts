import { TSelected } from 'components/Inputs/Select/types'

export interface IFormAddres {
  cep: boolean
  streetAddress: boolean
  number: boolean
  additionalInfo: boolean
  neighbourhood: boolean
  city: boolean
  stateOption: boolean
}

export interface IAddressForm {
  cep: [string, React.Dispatch<React.SetStateAction<string>>]
  type: [string, React.Dispatch<React.SetStateAction<string>>]
  streetAddress: [string, React.Dispatch<React.SetStateAction<string>>]
  number: [string, React.Dispatch<React.SetStateAction<string>>]
  complement: [string, React.Dispatch<React.SetStateAction<string>>]
  neighbourhood: [string, React.Dispatch<React.SetStateAction<string>>]
  city: [string, React.Dispatch<React.SetStateAction<string>>]
  state: [TSelected, React.Dispatch<React.SetStateAction<TSelected>>]
}

export interface IFormAddresData {
  cep: string
  streetAddress: string
  number: string
  additionalInfo: string
  neighbourhood: string
  city: string
  stateOption: string
}
