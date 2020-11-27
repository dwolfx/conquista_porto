export const Types = {
  PRIVATE_WELFARE_REQUEST: 'PRIVATE_WELFARE_REQUEST',
  PRIVATE_WELFARE_SUCCESS: 'PRIVATE_WELFARE_SUCCESS',
  PRIVATE_WELFARE_FAILURE: 'PRIVATE_WELFARE_FAILURE',
  PRIVATE_WELFARE_EMPTY: 'PRIVATE_WELFARE_EMPTY',
}

export interface IGetPrivateWelfareRequestData {
  type: keyof typeof Types
  cpf: string
}

interface IFund {
  fundName: string
  fundId: number
  distributionPercent: string
}

interface IValidationResult {
  errorDate: string
  correctedInd: boolean
  correctableInd: boolean
  level: string
  fieldName: string
  observation: string
}

// limpar campos desnecessários
export interface IPrivateWelfare {
  benefits: [
    {
      planId: number
      benefitId: string
      reserves: {
        reserveId: number
        funds: IFund[]
      }
      expectedContributionValue: string
      initialContributionValue: string
    }
  ]
  client: {
    physicalPersonId: number
    maritalStatus: string
    professionId: number
    birthDate: string
    personName: string
    cpf: string
    sexIndication: string
    contact: string
  }
  clientId: number
  retirementDate: string
  requestDate: string
  addresses: {
    addressDescription: string
    streetName: string
    streetType: string
    streetNumber: string
    addressType: string
    stateId: string
    neighborhood: string
    cityId: string
    defaultInd: string
    countryId: string
    cep: string
  }
  maritalStatus: string
  affiliationId: number
  salesAgencyId: number
  salesChannelId: number
  nationalityId: string
  salesOriginId: string
  residenceCountryId: number
  incomeTaxDeductible: boolean
  incomingPortabilityInd: string
  initialPayment?: {
    paymentDate: string
    paymentDescription: string
    address: {
      addressId: string
    }
    finantialResponsiblePersonId: number
    paymentTypeId: number
    paymentMethod: string
  }
  product: {
    companyId: number
    productId: number
  }
  professionId: number
  status: string
  formType: string
  taxOptionType: string
  totalMonthlyIncome: number
  consignorUnit: {}
  validationResults: IValidationResult[]
}
