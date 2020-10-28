import { dict } from 'components/IconExporter'

export type TOptions = {
  icon?: keyof typeof dict
  id: number | string
  text: string
  onClick?: () => void
  selected?: boolean
}

export type TSelected = {
  id?: number
  name?: string
  value?: number
}

export interface IProps {
  options: TOptions[]
  selected: TSelected
  label: string
  testId?: string
  disabled?: boolean
  isLoading?: boolean
  emptyText?: string
  optionBoxDirection?: 'top' | 'bottom'
  optionBoxSize?: number
}
