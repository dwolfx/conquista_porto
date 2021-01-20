import { dict } from 'components/IconExporter'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

export type IActions = {
  [key in 'invest' | 'redeem' | 'extract' | 'link' | 'info']?: (
    fundInfo: TObjectiveFunds
  ) => void
}

export interface IProps {
  funds: TObjectiveFunds[]
  footer?: React.ReactNode
  icon: keyof typeof dict
  isAccordion?: boolean
  showInfoCardOnMobile?: boolean
  textInfo?: React.ReactNode
  title: string
  isPendingFund?: boolean
  type: 'initial' | 'monthly'
}

export interface IMobileProps {
  showInfoCard?: boolean
  menuActions?: IActions
}
