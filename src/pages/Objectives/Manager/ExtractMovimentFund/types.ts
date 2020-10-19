import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

export interface IExtractFund extends TObjectiveFunds {
  onChange?(): void
  input_value?: string
}
