import { dict } from 'components/IconExporter'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

type TActions = 'invest' | 'redeem' | 'extract' | 'attach' | 'info'

export interface IActions {
  [key: string]: (fundInfo: TObjectiveFunds) => void
}

export interface IProps {
  funds: TObjectiveFunds[]
  footer?: React.ReactNode
  icon: keyof typeof dict
  textInfo?: React.ReactNode
  title: string
  type: 'initial' | 'monthly'
}

export interface IMobileProps {
  showInfoCard?: boolean
  menuActions?: IActions
}
