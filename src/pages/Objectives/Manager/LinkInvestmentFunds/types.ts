import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

export interface ILinkableFunds extends TObjectiveFunds {
  onChange?(): void
  input_value?: string
}
