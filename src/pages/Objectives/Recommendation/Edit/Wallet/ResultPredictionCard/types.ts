import { IIncome } from 'store/modules/Objective/types'

export type TPrediction = IIncome | null

export interface IPredictionProps {
  predictions: TPrediction
  warning: boolean
}
