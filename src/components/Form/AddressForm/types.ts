import { TSelected } from 'components/Inputs/Select/types'

export interface IFormAddres {
  cep: boolean
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
