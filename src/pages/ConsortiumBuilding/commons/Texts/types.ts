export interface IButtonModalTexts {
  exit: string
  continue: string
}

export interface IModalTexts {
  title: string
  content: string
  button: IButtonModalTexts
}

export interface IButtomTexts {
  start: string
  next: string
  simulate: string
  hire: string
  tryAgain: string
  updateSimulation: string
  changeData: string
  saveChanges: string
}

export interface IStateStepCreationFlux {
  actualStep: 1 | 2 | 3 | 4 | 5 | null
  title: string
  select: {
    label: string
  }
}

export interface IValueStepCreationFlux {
  title: string
  description: string
  inputLabel: string
}

export interface ICardSimulationResultsStepCreationFlux {
  title: string
  buttonOptionGroup: {
    inFormation: string
    inProgress: string
  }
  label: {
    monthlyInstallment: string
    group: string
    numberInstallment: string
    quota: string
  }
  ratesSummary: {
    title: string
    reserveFund: string
    administrativeFee: string
    earlyAdministrationFree: string
    lifeInsurance: string
  }
}

export interface ISimulationResultsStepCreationFlux {
  messageLoad: string
  errorMessageLoad: string
  emptyResult: string
  drawerTitleChangeDataSimulation: string
  title: string
  cards: ICardSimulationResultsStepCreationFlux
}

export interface IStepCreationFlux {
  state: IStateStepCreationFlux
  value: IValueStepCreationFlux
  simulationResults: ISimulationResultsStepCreationFlux
}

export interface ILabelContainerFirstInformationConfirmationStepHireFlux {
  name: string
  document: string
  dateOfBirth: string
  nationality: string
  civilStatus: string
  spouseName: string
  spouseDocument: string
}

export interface ILabelContainerSecondInformationConfirmationStepHireFlux {
  email: string
  phone: string
}

export interface ILabelContainerFourthInformationConfirmationStepHireFlux {
  zipCode: string
  address: string
}

export interface ILabelContainerThirdInformationConfirmationStepHireFlux {
  documentType: string
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

export interface ILabelContainerFifthInformationConfirmationStepHireFlux {
  title: string
  content: string
}

export interface ILabelContainerSixthInformationConfirmationStepHireFlux {
  title: string
  label: {
    profession: string
    grossMonthlyIncome: string
  }
}

export interface IContainerInformationConfirmationStepHireFlux {
  title: string
  link?: string
  messageRNE?: string
  text?: ILabelContainerFifthInformationConfirmationStepHireFlux
  label?: string | ILabelContainerFourthInformationConfirmationStepHireFlux
}

export interface IContainerFirstInformationConfirmationStepHireFlux {
  title: string
  link: string
  label: ILabelContainerFirstInformationConfirmationStepHireFlux
}

export interface IContainerSecondInformationConfirmationStepHireFlux {
  title: string
  link: string
  label: ILabelContainerSecondInformationConfirmationStepHireFlux
}

export interface IPlaceholderContainerThirdInformationConfirmationStepHireFlux {
  documentNumber: string
  dateDispatch: string
  expeditedBodyRG: string
  expeditedBodyRNE: string
}

export interface IContainerThirdInformationConfirmationStepHireFlux {
  title: string
  label: ILabelContainerThirdInformationConfirmationStepHireFlux
  messageRNE: string
  placeholder: IPlaceholderContainerThirdInformationConfirmationStepHireFlux
}

export interface IContainerFourthInformationConfirmationStepHireFlux {
  title: string
  link: string
  label: ILabelContainerFourthInformationConfirmationStepHireFlux
}

export interface IInformationConfirmationStepHireFlux {
  actualStep: 1 | 2 | 3 | 4 | 5 | null
  title: string
  subtitle: string
  containerFirst: IContainerFirstInformationConfirmationStepHireFlux
  containerSecond: IContainerSecondInformationConfirmationStepHireFlux
  containerThird: IContainerThirdInformationConfirmationStepHireFlux
  containerFourth: IContainerFourthInformationConfirmationStepHireFlux
  containerFifth: IContainerInformationConfirmationStepHireFlux
  containerSixth: ILabelContainerSixthInformationConfirmationStepHireFlux
}

export interface ILabelContainerFirstPaymentStepHireFlux {
  monthlyInstallment: string
  numberInstallment: string
  dateForeseenFirstInstallment: string
  dateOtherPlots: string
}

export interface IContainerFirstPaymentStepHireFlux {
  title: string
  label: ILabelContainerFirstPaymentStepHireFlux
}

export interface ICheckboxContainerSecondPaymentStepHireFlux {
  title: string
  subtitle: string
}

export interface IContainerSecondPaymentStepHireFlux {
  title: string
  subtitle: string
  checkboxDebit: ICheckboxContainerSecondPaymentStepHireFlux
  checkboxBillet: ICheckboxContainerSecondPaymentStepHireFlux
}

export interface IMessageImportantContainerThirdPaymentStepHireFlux {
  title: string
  article: {
    textFirst: string
    textSecond: string
  }
}

export interface IRateContainerThirdPaymentStepHireFlux {
  title: string
  subtitle: string
  label: string
}

export interface ILabelContainerThirdPaymentStepHireFlux {
  bank: string
  agency: string
  currentAccount: string
  digit: string
}

export interface IContainerThirdPaymentStepHireFlux {
  title: string
  subtitle: string
  caption: string
  messageImportant: IMessageImportantContainerThirdPaymentStepHireFlux
  rate: IRateContainerThirdPaymentStepHireFlux
  label: ILabelContainerThirdPaymentStepHireFlux
}

export interface IPaymentStepHireFlux {
  actualStep: 1 | 2 | 3 | 4 | 5 | null
  title: string
  drawerTitle: string
  subtitleFirst: string
  subtitleSecond: string
  containerFirst: IContainerFirstPaymentStepHireFlux
  containerSecond: IContainerSecondPaymentStepHireFlux
  containerThird: IContainerThirdPaymentStepHireFlux
}

export interface IContentContainerFirstLifeInsuranceStepHireFlux {
  textFirst: {
    item: string
    text: string[]
  }
  textSecond: {
    item: string
    text: string
  }
  textThird: {
    item: string
    text: string
  }
}

export interface IContainerLifeInsuranceStepHireFlux {
  title?: string
  content?: IContentContainerFirstLifeInsuranceStepHireFlux
  itens?: string[]
  texts?: string[]
  titleTextArea?: string
  checkbox?: string
}

export interface ILifeInsuranceStepHireFlux {
  title: string
  actualStep: 1 | 2 | 3 | 4 | 5 | null
  content: string
  containerFirst: IContainerLifeInsuranceStepHireFlux
  containerSecond: IContainerLifeInsuranceStepHireFlux
  containerThird: IContainerLifeInsuranceStepHireFlux
}

export interface IContainerInsuranceLenderStepHireFlux {
  placeholder: string | string[]
  text: string | string[]
}

export interface ITextsContainerInsuranceLenderStepHireFlux {
  title: string
  texts: IContainerInsuranceLenderStepHireFlux[]
}

export interface IInsuranceLenderStepHireFlux {
  title: string
  actualStep: 1 | 2 | 3 | 4 | 5 | null
  subtitle: string
  containerMain: ITextsContainerInsuranceLenderStepHireFlux
}

export interface IModalBackSimulationSummaryStepHireFlux {
  title: string
  content: string
  button: {
    goback: string
    continue: string
  }
}

export interface IContentContainerFirstSummaryStepHireFlux {
  creditValue: string
  reserveFund: string
  lifeInsurance: string
  administrativeFee: string
  earlyAdministrationFree: string
}

export interface IContentContainerThirdSummaryStepHireFlux {
  firstInstallmentPaymentMethod: string
  paymentRemainingInstallments: string
  bank: string
  agency: string
  currentAccount: string
  earlyAdministrationFree: string
}

export interface IContainerSummaryStepHireFlux {
  title: string
  label:
    | { link: string }
    | IContentContainerFirstSummaryStepHireFlux
    | ILabelContainerFirstPaymentStepHireFlux
    | IContentContainerThirdSummaryStepHireFlux
}

export interface ISummaryStepHireFlux {
  title: string
  actualStep: 1 | 2 | 3 | 4 | 5 | null
  subtitle: string
  modalBackSimulation: IModalBackSimulationSummaryStepHireFlux
  containerFirst: IContainerSummaryStepHireFlux
  containerSecond: IContainerSummaryStepHireFlux
  containerThird: IContainerSummaryStepHireFlux
}

export interface IContentResultHireStepHireFlux {
  success: {
    title: string
    subtitle: string
  }
  fail: {
    title: string
    subtitle: string
  }
}

export interface ISummaryResultHireStepHireFlux {
  title: string
  label:
    | IContentContainerFirstSummaryStepHireFlux
    | IContentContainerThirdSummaryStepHireFlux
    | ILabelContainerFirstPaymentStepHireFlux
}

export interface IResultHireStepHireFlux {
  content: IContentResultHireStepHireFlux
  summary: ISummaryResultHireStepHireFlux
}

export interface IStepHireFlux {
  informationConfirmation: IInformationConfirmationStepHireFlux
  payment: IPaymentStepHireFlux
  lifeInsurance: ILifeInsuranceStepHireFlux
  insuranceLender: IInsuranceLenderStepHireFlux
  summary: ISummaryStepHireFlux
  resultHire: IResultHireStepHireFlux
}

export interface ICreationFlux {
  title: string
  stepMax: 1 | 2 | 3 | 4 | 5 | null
  steps: IStepCreationFlux
}

export interface IHireFlux {
  title: string
  stepMax: 1 | 2 | 3 | 4 | 5 | null
  steps: IStepHireFlux
}

export interface IFormDefault {
  placeholderInput: string
  placeholderSelect: string
}

export interface ITexts {
  page: string
  modalFlowExit: IModalTexts
  buttons: IButtomTexts
  creation: ICreationFlux
  formDefault: IFormDefault
  hire: IHireFlux
}
