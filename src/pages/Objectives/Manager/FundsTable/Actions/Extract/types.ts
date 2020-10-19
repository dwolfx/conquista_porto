import { dict } from 'components/IconExporter'
import {
  IFundExtract,
  TObjectiveFunds,
} from 'store/modules/ObjectiveManagement/types'

export interface IExtractProps {
  fund: TObjectiveFunds
  handleClose: () => void
  isOpen: boolean
  // TObjectiveFunds | undefined
}

export type TError =
  | {
      icon: keyof typeof dict
      message: string
    }
  | undefined

export interface IState {
  objectiveManagement: {
    isLoadingExtractFund: boolean
    dataExtract: IFundExtract[]
  }
}
