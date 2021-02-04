import { dict } from "components/IconExporter";
import { IErrorForm } from "./types";

export const ErrorForm =  (stepValue: string = 'R$ 50.000,00 e R$ 500.000,00', stepPersonData: string = '1.183,90'):IErrorForm => ({
  isRequired: {
    icon: 'information' as keyof typeof dict,
    message: 'Campo obrigatório',
  },
  coveredValue: {
    icon: 'information' as keyof typeof dict,
    message: `O valor deve ser entre ${stepValue}`,
  },
  isNumber: {
    icon: 'information' as keyof typeof dict,
    message: `Número inválido. Por favor, verifique.`,
  },
  isDate: {
    icon: 'information' as keyof typeof dict,
    message: 'A data deve ser anterior. Por favor, verifique.'
  },
  isAbbreviation: {
    icon: 'information' as keyof typeof dict,
    message: 'A sigla deve seguir o formato XXX/UF'
  },
  isDocumentNumber: {
    icon: 'information' as keyof typeof dict,
    message: 'CPF inválido. Por favor, verifique e tente novamente.'
  },
  isGrossMonthlyIncome: {
    icon: 'information' as keyof typeof dict,
    message: `O valor total não pode ser menor que ${stepPersonData}`
  }
});
