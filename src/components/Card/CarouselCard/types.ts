import { dict } from 'components/IconExporter'

export interface ICarouselCard {
  headerIcon?: keyof typeof dict
  headerTitle?: string | React.ReactNode
  headerEndItem?: React.ReactNode
  arrayContent?: React.ReactNode[]
}

export interface IChangePageButton {
  disabled: boolean
}
