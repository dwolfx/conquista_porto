import { dict } from 'components/IconExporter'

export interface ICardsInfo {
  group: 1 | 2 | 3 | 4 | 5
  points: number
  type: string
  exchangeProduct: string
  exchangeValue?: number
  icon?: keyof typeof dict
  image: string
}

export interface IRecommendationCardProps {
  cardIcon: keyof typeof dict
  cardTitle: string
  hasCreditCard: boolean
  offer: ICardsInfo
}
