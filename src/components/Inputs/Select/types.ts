import { dict } from 'components/IconExporter'

export type TOptions = {
  icon?: keyof typeof dict
  id: number | string
  text: string
  onClick?: () => void
  selected?: boolean
}

export type TSelected = {
  id?: number | string
  name?: string
  value?: any
}

export interface IProps {
  options: TOptions[]
  selected: TSelected
  label: string
  testId?: string
  disabled?: boolean
  isLoading?: boolean
  hasLockIcon?: boolean
  emptyText?: string
  optionBoxDirection?: 'top' | 'bottom'
  optionBoxSize?: number
}
