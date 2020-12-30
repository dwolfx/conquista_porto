import { IFunds } from 'store/modules/Objective/types'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

export interface IPercentual {
  funds: IFunds[] | TObjectiveFunds[]
}

export interface IFundCategories {
  [key: string]: number
}
