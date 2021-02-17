import {
  ILabelContainerFifthInformationConfirmationStepHireFlux,
  ILabelContainerFirstInformationConfirmationStepHireFlux,
  ILabelSixthInformationConfirmationStepHireFlux,
  ILabelContainerThirdInformationConfirmationStepHireFlux,
  IPlaceholderContainerThirdInformationConfirmationStepHireFlux,
} from 'pages/ConsortiumBuilding/commons/Texts/types'

export interface IPersonalDataForm {
  civilStatus: string
  spouseName?: string
  spouseDocument?: string
}

export interface IDocumentForm {
  isForeignResidency: boolean
  documentType: 'RG' | 'RNE' | ''
  address: string
  documentNumber: string
  dateDispatch: string
  expeditedBody: string
  foreignResidence: string
  countryResidence: string
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
