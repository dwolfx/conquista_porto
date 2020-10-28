import { Dispatch, SetStateAction } from 'react'

export interface IForm {}

export interface IStepComponent {
  form: {}
  onChangeForm: Dispatch<SetStateAction<{}>>
  onNextStep: () => void
}

export interface IOption {
  id: number,
  name: string
}

export enum DocumentType {
  RG = 'RG',
  RNE = 'RNE',
  CNH = 'CNH',
  PASSPORT = 'Passaporte',
}

export type BrazilianState = {}
