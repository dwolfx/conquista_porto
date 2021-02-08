import {
  IAdditionalCountries,
  ICompanion,
  IPayment,
  IPoliticallyExposedPerson,
  IMainPassenger,
} from 'pages/TripInsurance/Creation/types'

import CustomerTravelDetailsForm from './Creation/PartnerOffer/Steps/CustomerTravelDetailsForm'
import TravelDetailsForm from './Creation/PartnerOffer/Steps/TravelDetailsForm'

import InsuranceSummary from './Creation/CustomerProposalOffer/Steps/InsuranceSummary'
import ProposalSummary from './Creation/CustomerProposalOffer/Steps/ProposalSummary'

export const ParnerSteps = {
  CustomerTravelDetailsForm: CustomerTravelDetailsForm,
  TravelDetailsForm: TravelDetailsForm,
}

export const CustomerSteps = {
  InsuranceSummary: InsuranceSummary,
  ProposalSummary: ProposalSummary,
}

export interface IForm {
  acompanhantes?: ICompanion[]
  codigoCanal?: number
  codigoOperacao?: string
  codigoPaisDestino?: string
  codigoUfOrigem?: string
  dataIda?: string
  dataVolta?: string
  hasLatinAmericaCountryAndOtherCountry?: boolean
  hasOnlyLatinAmericaDestination?: boolean
  idParceiro?: number
  idSimulacao?: string
  isAceiteTermos?: boolean
  isCienteMoto?: boolean
  isMotocicleta?: boolean
  isPraticaAventura?: boolean
  motivoViagem?: number
  nationalDestination?: boolean
  nomeDoPlano?: string
  pacoteEscolhido?: string
  paisesAdicionais?: IAdditionalCountries[]
  pagamento?: IPayment
  passageiroPrincipal?: IMainPassenger
  pessoaExposta?: IPoliticallyExposedPerson
  qtdPassagMaiorSetentaAnos?: number
  qtdPassagMenorSetentaAnos?: number
  susep?: string
  valorComDesconto?: number
  valorSeguro?: number
  valorSemDesconto: number
}
