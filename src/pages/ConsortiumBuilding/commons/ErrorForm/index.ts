import { dict } from 'components/IconExporter'
import { IErrorForm } from './types'

export const ErrorForm = (
  stepValue: string = 'R$ 50.000,00 e R$ 500.000,00',
  stepPersonData: string = '1.183,90'
): IErrorForm => ({
  requiredValidationMessage: {
    icon: 'information' as keyof typeof dict,
    message: 'Campo obrigatório',
  },
  coveredValueValidationMessage: {
    icon: 'alertrounded' as keyof typeof dict,
    message: `O valor deve ser entre ${stepValue}`,
  },
  numberValidationMessage: {
    icon: 'information' as keyof typeof dict,
    message: `Número inválido. Por favor, verifique.`,
  },
  dateValidationMessage: {
    icon: 'information' as keyof typeof dict,
    message: 'A data deve ser anterior. Por favor, verifique.',
  },
  abbreviationValidationMessage: {
    icon: 'information' as keyof typeof dict,
    message: 'A sigla deve seguir o formato XXX/UF',
  },
  nifValidationMessage: {
    icon: 'information' as keyof typeof dict,
    message: 'NIF inválido.',
  },
  passportNumberValidationMessage: {
    icon: 'information' as keyof typeof dict,
    message: 'Número do Passaporte inválido.',
  },
  documentNumberValidationMessage: {
    icon: 'information' as keyof typeof dict,
    message: 'CPF inválido. Por favor, verifique e tente novamente.',
  },
  grossMonthlyIncomeValidationMessage: {
    icon: 'information' as keyof typeof dict,
    message: `O valor total não pode ser menor que ${stepPersonData}`,
  },
})
