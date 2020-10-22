import { dict } from 'components/IconExporter'

export type TOptions = {
  icon?: keyof typeof dict
  id: number | string
  text: string
  onClick?: () => void
  selected?: boolean
}

export interface IProps {
  options: TOptions[]
  selected: {
    name?: string
    id?: number
    value?: number
  }
  label: string
  testId?: string
}
