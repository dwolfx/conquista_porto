import { IIncome } from 'store/modules/Objective/types'

export type TPrediction = IIncome | null

export interface IPredictionProps {
  prediction: TPrediction
  warning: boolean
}

export interface IResultPredictionModalProps {
  prediction: TPrediction
  warning: boolean
  isOpen: boolean
  handleClose: () => void
  handleButtonAction: () => void
}
