import React from 'react'
import moment from 'moment'

import { TOptions, TSelected } from 'components/Inputs/Select/types'
import { IPlaceholderContainerThirdInformationConfirmationStepHireFlux } from 'pages/ConsortiumBuilding/commons/Texts/types'
import { IDocumentForm } from '../types'
import { validationInputError } from 'pages/CreditCard/Creation/CreditCardStep/validators'
import { dict } from 'components/IconExporter'
import { IErrorResponse } from 'pages/ConsortiumBuilding/commons/ErrorForm/types'
import { ErrorForm } from 'pages/ConsortiumBuilding/commons/ErrorForm'
import { validityError } from 'pages/TripInsurance/Hire/PaymentStep/CreditCard/utils'
import { IPayload } from 'store/modules/ConsortiumBuilding/States/types'

const { isDate, isAbbreviation } = ErrorForm()

export const setDocumentTypeOptionMethod = (
  setData: React.Dispatch<React.SetStateAction<TSelected>>,
  setForm?: React.Dispatch<React.SetStateAction<IDocumentForm>>,
  formData?: IDocumentForm,
  clearForm?: () => void
): TOptions[] =>
  ['RG', 'RNE'].map((value, index) => ({
    id: index + 1,
    text: value,
    onClick: () => {
      setData({ id: index + 1, name: value })
      if (setForm && formData) {
        setForm({
          ...formData,
          documentType: value === 'RG' ? 'RG' : 'RNE',
        })
      }
      if (clearForm) {
        clearForm()
      }
    },
  }))

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

    if (moment().isAfter(validate)) {
      return isDate
    }
  }

  return validationInputError(dateDispatch, validation)
}

export const validationErrorExpeditedBody = (
  expeditedBody: string,
  validation: boolean,
  consortiumBuildingStatesData: IPayload
): boolean | { icon: keyof typeof dict; message: string } => {
  /**
   * FALTA HÁ VALIDAÇÃO DO ORGÃO EXPEDITOR
   */
  if (expeditedBody && expeditedBody.length === 6) {
    const [, uf] = expeditedBody.split('/')

    const findState = consortiumBuildingStatesData.uf.findIndex(
      value => value.sigla === uf
    )

    if (findState === -1) {
      return isAbbreviation
    }
  }

  return validationInputError(expeditedBody, validation)
}
