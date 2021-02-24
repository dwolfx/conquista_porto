import { dict } from 'components/IconExporter'

export interface IErrorResponse {
  icon: keyof typeof dict
  message: string
}

export interface IErrorForm {
  requiredValidationMessage: IErrorResponse
  coveredValueValidationMessage: IErrorResponse
  numberValidationMessage: IErrorResponse
  dateValidationMessage: IErrorResponse
  abbreviationValidationMessage: IErrorResponse
  nifValidationMessage: IErrorResponse
  passportNumberValidationMessage: IErrorResponse
  documentNumberValidationMessage: IErrorResponse
  grossMonthlyIncomeValidationMessage: IErrorResponse
}
