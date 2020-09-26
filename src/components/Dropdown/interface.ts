import { dict } from 'components/IconExporter'

interface IChildSecondProp {
  icon?: keyof typeof dict
  text?: string
  path?: string
}

export interface IItemsProps {
  icon?: keyof typeof dict
  text?: string
  path?: string
  children?: IChildSecondProp[]
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}
