import { dict } from 'components/IconExporter'

export interface IParcelOptionState {
  id: number
  name: string
}

export type TFlagName = '' | keyof typeof dict

export interface IOption {
  id: number
  text: string
  onClick: () => void
}
