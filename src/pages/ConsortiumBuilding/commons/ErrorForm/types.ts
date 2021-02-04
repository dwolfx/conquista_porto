import { dict } from "components/IconExporter";

export interface IErrorResponse {
  icon: keyof typeof dict; message: string
}

export interface IErrorForm {
  isRequired: IErrorResponse
  coveredValue: IErrorResponse
  isNumber: IErrorResponse
  isDate: IErrorResponse
  isAbbreviation: IErrorResponse
  isDocumentNumber: IErrorResponse
  isGrossMonthlyIncome: IErrorResponse
}
