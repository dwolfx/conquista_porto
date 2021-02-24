import moment from 'moment'
import { TSelected } from 'components/Inputs/Select/types'
import { brazilianStates } from 'pages/CreditCard/Creation/CreditCardStep/Selects/BrazilianStates/types'
import { IPlaceholderContainerThirdInformationConfirmationStepHireFlux } from 'pages/ConsortiumBuilding/commons/Texts/types'
import { ErrorForm } from 'pages/ConsortiumBuilding/commons/ErrorForm'
import { validityError } from 'pages/TripInsurance/Hire/PaymentStep/CreditCard/utils'
import { IValidationFunction } from '../types'
const {
  numberValidationMessage,
  dateValidationMessage,
  abbreviationValidationMessage,
  nifValidationMessage,
  passportNumberValidationMessage,
} = ErrorForm()

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
  type: string
): IValidationFunction => {
  const value = documentNumber.replace(/\D/g, '')

  if (type === 'RG') {
    if ((value.length < 7 || value.length > 9) && validationDocumentNumber) {
      return numberValidationMessage
    }
  }

  if (type === 'RNE') {
    if ((value.length < 8 || value.length > 12) && validationDocumentNumber) {
      return numberValidationMessage
    }
  }

  return undefined
}

export const validationErrorDateDispatch = (
  dateDispatch: string,
  isTouched: boolean
): IValidationFunction => {
  if (dateDispatch && isTouched) {
    if (dateDispatch.length < 10) {
      return validityError
    }

    if (dateDispatch.length === 10) {
      const validate = moment(dateDispatch, 'DD/MM/YYYY')

      if (!validate.isValid()) {
        return validityError
      }

      if (moment().isBefore(validate)) {
        return dateValidationMessage
      }
    }
  }

  return undefined
}

export const validationErrorExpeditedBody = (
  expeditedBody: string,
  validation: boolean
): IValidationFunction => {
  if (expeditedBody && expeditedBody.length === 6 && validation) {
    const [, uf] = expeditedBody.split('/')

    const findState = brazilianStates.findIndex(value => value === uf)

    if (findState === -1) {
      return abbreviationValidationMessage
    }
  }

  return undefined
}

export const validationErrorNIF = (
  value: string,
  validation: boolean
): IValidationFunction => {
  if (value && value.length > 25 && validation) {
    return nifValidationMessage
  }

  return undefined
}

export const validationErrorPassportNumber = (
  value: string,
  validation: boolean
): IValidationFunction => {
  if (value && value.length > 6 && validation) {
    return passportNumberValidationMessage
  }

  return undefined
}
