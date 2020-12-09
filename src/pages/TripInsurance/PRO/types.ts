import { IAdditionalCountries, ICompanion, IPayment, IMainPassenger } from "../Creation/types";

import TravelDetailsForm from "./Creation/PartnerOffer/Steps/TravelDetailsForm";
import CustomerTravelDetailsForm from "./Creation/PartnerOffer/Steps/CustomerTravelDetailsForm";

import ProposalSummary from './Creation/CustomerProposalOffer/Steps/ProposalSummary'
import InsuranceSummary from './Creation/CustomerProposalOffer/Steps/InsuranceSummary'

export const ParnerSteps = {
  TravelDetailsForm: TravelDetailsForm,
  CustomerTravelDetailsForm: CustomerTravelDetailsForm, 
}

export const CustomerSteps = {
  InsuranceSummary: InsuranceSummary,
  ProposalSummary: ProposalSummary
}

export interface IForm {
  idParceiro: number
  dataIda?: string
  dataVolta?: string
  motivoViagem?: number
  isPraticaAventura?: boolean
  isMotocicleta?: boolean
  qtdPassagMenorSetentaAnos?: number
  qtdPassagMaiorSetentaAnos?: number
  codigoUfOrigem?: string
  codigoPaisDestino?: string
  paisesAdicionais?: IAdditionalCountries[]
  pacoteEscolhido?: string
  valorSeguro?: number
  passageiroPrincipal?: IMainPassenger
  acompanhantes?: ICompanion[]
  pagamento?: IPayment
  isAceiteTermos?: boolean
  isCienteMoto?: boolean
  codigoOperacao?: string
  susep?: string
  nomeDoPlano?: string
  valorComDesconto: number
  valorSemDesconto: number
  codigoCanal?: number
}
