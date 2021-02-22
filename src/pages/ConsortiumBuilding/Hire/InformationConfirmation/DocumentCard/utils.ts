import moment from 'moment'

import { TSelected } from 'components/Inputs/Select/types'
import { brazilianStates } from 'pages/CreditCard/Creation/CreditCardStep/Selects/BrazilianStates/types'
import { IPlaceholderContainerThirdInformationConfirmationStepHireFlux } from 'pages/ConsortiumBuilding/commons/Texts/types'
import { validationInputError } from 'pages/CreditCard/Creation/CreditCardStep/validators'
import { dict } from 'components/IconExporter'
import { IErrorResponse } from 'pages/ConsortiumBuilding/commons/ErrorForm/types'
import { ErrorForm } from 'pages/ConsortiumBuilding/commons/ErrorForm'
import { validityError } from 'pages/TripInsurance/Hire/PaymentStep/CreditCard/utils'

const { isDate, isAbbreviation } = ErrorForm()

export const placeholderExpediteBody = (
  documentType: TSelected,
  placeholder: IPlaceholderContainerThirdInformationConfirmationStepHireFlux
): string => {
  if (documentType.name === 'RG') {
    return placeholder.expeditedBodyRG
  }

  if (documentType.name === 'RNE') {
    return placeholder.expeditedBodyRNE
  }

  return ''
}

export const validationErrorDocument = (
  documentNumber: string,
  validationDocumentNumber: boolean,
  isNumber: IErrorResponse
): boolean | { icon: keyof typeof dict; message: string } => {
  const value = documentNumber.replace(/\D/g, '')

  if ((value.length < 7 || value.length > 9) && validationDocumentNumber) {
    return isNumber
  }

  return validationInputError(value, validationDocumentNumber)
}

export const validationErrorDateDispatch = (
  dateDispatch: string,
  validation: boolean
): boolean | { icon: keyof typeof dict; message: string } => {
  if (dateDispatch && dateDispatch.length === 10) {
    const validate = moment(dateDispatch, 'DD/MM/YYYY')

    if (!validate.isValid()) {
      return validityError
    }

    if (moment().isBefore(validate)) {
      return isDate
    }
  }

  return validationInputError(dateDispatch, validation)
}

export const validationErrorExpeditedBody = (
  expeditedBody: string,
  validation: boolean
): boolean | { icon: keyof typeof dict; message: string } => {
  /**
   * FALTA HÁ VALIDAÇÃO DO ORGÃO EXPEDITOR
   */
  if (expeditedBody && expeditedBody.length === 6) {
    const [, uf] = expeditedBody.split('/')

    const findState = brazilianStates.findIndex(value => value === uf)

    if (findState === -1) {
      return isAbbreviation
    }
  }

  return validationInputError(expeditedBody, validation)
}
