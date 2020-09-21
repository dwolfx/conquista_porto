export interface IInsuranceCard {
  headerEndItem?: React.ReactNode
}

export interface IInsuranceEmptyStateCard {}

export interface IInsuranceErrorStateCard {}

export interface IInsuranceLoadingStateCard {}

export interface IInsuranceDataStateCard {
  data: any
}

export interface IBasicCoverage {
  CapitalSegurado: string
  Nome: string
}
