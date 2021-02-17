import {
  IAdditionalCountries,
  ICompanion,
  IPayment,
  IPoliticallyExposedPerson,
  IMainPassenger,
} from 'pages/TripInsurance/Creation/types'
import {
  ICreditCardInstallment,
  ICoverage,
} from 'store/modules/TripInsurance/InsuranceQuotation/types'

import CustomerTravelDetailsForm from './Creation/PartnerOffer/Steps/CustomerTravelDetailsForm'
import TravelDetailsForm from './Creation/PartnerOffer/Steps/TravelDetailsForm'

import InsuranceSummary from './Creation/CustomerProposalOffer/Steps/InsuranceSummary'
import ProposalSummary from './Creation/CustomerProposalOffer/Steps/ProposalSummary'
import SuccessState from './Creation/CustomerProposalOffer/Steps/RequestProposalStatus/Success'
import ErrorState from './Creation/CustomerProposalOffer/Steps/RequestProposalStatus/Error'

export const ParnerSteps = {
  CustomerTravelDetailsForm: CustomerTravelDetailsForm,
  TravelDetailsForm: TravelDetailsForm,
}

export const CustomerSteps = {
  InsuranceSummary: InsuranceSummary,
  ProposalSummary: ProposalSummary,
  successStep: SuccessState,
  errorStep: ErrorState,
}

export interface IForm {
  acompanhantes?: ICompanion[]
  codigoPaisDestino?: string
  codigoUfOrigem?: string
  dataIda?: string
  dataVolta?: string
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
  valorComDesconto?: number
  valorSemDesconto?: number
  formasPagamento?: {
    listaParcelamentoCartao: ICreditCardInstallment[]
    listaParcelamentoCartaoPorto: ICreditCardInstallment[]
  }
  coberturas: ICoverage[]
  codigoOperacao?: string
  idParceiro?: number
  susep?: string
}
