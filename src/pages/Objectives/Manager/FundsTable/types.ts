import { dict } from 'components/IconExporter'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

export interface IProps {
  funds: TObjectiveFunds[]
  icon: keyof typeof dict
  textInfo?: React.ReactNode
  title: string
}
