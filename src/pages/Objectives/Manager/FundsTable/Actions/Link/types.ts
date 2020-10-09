import { dict } from 'components/IconExporter'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

export interface ILinkProps {
  fund: TObjectiveFunds
  handleClose: () => void
  isOpen: boolean
  type: 'initial' | 'monthly'
}

export type TError =
  | {
      icon: keyof typeof dict
      message: string
    }
  | undefined

export interface IState {
  objectiveManagement: {
    isLoadingFundsMovement: boolean
  }
}
