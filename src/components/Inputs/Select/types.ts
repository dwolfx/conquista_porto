import { dict } from 'components/IconExporter'

export type TOptions = {
  icon?: keyof typeof dict
  id: number | string
  text: string
  onClick?: () => void
  selected?: boolean
}

export type TSelected = {
  name?: string
  id?: number
  value?: number
}

export interface IProps {
  options: TOptions[]
  selected: TSelected
  label: string
  testId?: string
  optionBoxDirection?: 'top' | 'bottom'
  optionBoxSize?: number
}
