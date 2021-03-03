import { IRecommendations, IFunds } from 'store/modules/Objective/types'

export interface IHandleInputsBlur {
  event: React.ChangeEvent<HTMLInputElement>
  value: number
  row: IFunds
  hasError: boolean
}

export interface IHandleOnClickRecalculate {
  initialValue: number
  monthlyValue: number
  fund: IFunds
  hasError: boolean
}

export type THandleInputBlurFunction = ({
  event,
  value,
  row,
}: IHandleInputsBlur) => void

export interface IHandleInputsChange {
  row: IFunds
  inputedValue: number
  type: 'initial_value' | 'monthly_value'
}

export type THandleInputChangeFunction = ({
  row,
  inputedValue,
  type,
}: IHandleInputsChange) => void

export interface IState {
  objective: {
    data: IRecommendations
    isLoadingRelculateFundsData: boolean
    isLoadingPutRecommendation: boolean
  }
  objectiveManagement: {
    isLoading: boolean
  }
}
