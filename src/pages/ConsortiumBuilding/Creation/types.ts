import ChooseState from './ChooseState'
import ContemplatedValue from './ContemplatedValue'

export const Steps = {
  chooseState: ChooseState,
  contemplatedValue: ContemplatedValue,
}

export interface IForm {
  selectedState?: string
  contemplatedValue?: string
}
