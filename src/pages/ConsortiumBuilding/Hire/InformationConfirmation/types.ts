import { TSelected } from 'components/Inputs/Select/types'
import {
  ILabelContainerFifthInformationConfirmationStepHireFlux,
  ILabelContainerFirstInformationConfirmationStepHireFlux,
  ILabelSixthInformationConfirmationStepHireFlux,
  ILabelContainerThirdInformationConfirmationStepHireFlux,
  IPlaceholderContainerThirdInformationConfirmationStepHireFlux,
  IContainerFourthInformationConfirmationStepHireFlux,
} from 'pages/ConsortiumBuilding/commons/Texts/types'

export interface IPersonalDataForm {
  civilStatus: string
  spouseName?: string
  spouseDocument?: string
}

export interface IDocumentForm {
  isForeignResidency: boolean
  documentNumber: string
  dateDispatch: string
  expeditedBody: string
  foreignResidence: string
  documentNumberNIF: string
  fatca: string
  passportNumber: string
  passportType: string
  passportIssuingCountry: string
}

export interface IPpeForm {
  isPpe: boolean
  whoPoliticallyExport: string
}

export interface IDocumentCard {
  documentData: [
    IDocumentForm,
    React.Dispatch<React.SetStateAction<IDocumentForm>>
  ]
  documentType: [TSelected, React.Dispatch<React.SetStateAction<TSelected>>]
  label: ILabelContainerThirdInformationConfirmationStepHireFlux
  text: string
  placeholder: IPlaceholderContainerThirdInformationConfirmationStepHireFlux
  isForeignResidency: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export interface IPersonalDataCard {
  personalData: [
    IPersonalDataForm,
    React.Dispatch<React.SetStateAction<IPersonalDataForm>>
  ]
  label: ILabelContainerFirstInformationConfirmationStepHireFlux
}

export interface IFormPersonalData {
  spouseDocument: boolean
  spouseName: boolean
}

export interface IFormDocumentData {
  documentType: boolean
  address: boolean
  documentNumber: boolean
  dateDispatch: boolean
  expeditedBody: boolean
  foreignResidence: boolean
  countryResidence: boolean
  documentNumberNIF: boolean
  fatca: boolean
  passportNumber: boolean
  passportType: boolean
  passportIssuingCountry: boolean
}

export interface IPpeCard {
  label: ILabelContainerFifthInformationConfirmationStepHireFlux
  ppeData: [IPpeForm, React.Dispatch<React.SetStateAction<IPpeForm>>]
}

export interface IFinancialForm {
  profession: string
  grossMonthlyIncome: string
}

export interface IFinancialCard {
  label: ILabelSixthInformationConfirmationStepHireFlux
  financialData: [
    IFinancialForm,
    React.Dispatch<React.SetStateAction<IFinancialForm>>
  ]
}

export interface IAddressForm {
  bairro?: string
  numero?: string
  tipo?: string
  logradouro?: string
  cidade?: string
  uf?: string
  complemento?: string
  numeroCep?: string
  complementoCep?: string
}

export interface IAddressConsortiumBuilding {
  texts: IContainerFourthInformationConfirmationStepHireFlux
  addressData: [
    IAddressForm,
    React.Dispatch<React.SetStateAction<IAddressForm>>
  ]
}
