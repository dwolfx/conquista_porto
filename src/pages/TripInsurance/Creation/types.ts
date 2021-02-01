import AdventureSports from './AdventureSports'
import PassengerStep from './PassengerStep'
import OriginTrip from './OriginTripStep'
import CoverageDate from './CoverageDate'
import MotocicleQuestion from './MotocicleQuestion'
import ChoosePlan from './ChoosePlan'
import InformationConfirmation from '../Hire/InformationConfirmation'
import CompanionStep from '../Hire/CompanionStep'
import PaymentStep from '../Hire/PaymentStep'
import Summary from '../Hire/Sumary'
import Success from '../Hire/RequestProposalStatus/Success'
import ErrorState from '../Hire/RequestProposalStatus/Error'

export const Steps = {
  originTrip: OriginTrip,
  coverageDate: CoverageDate,
  passengerStep: PassengerStep,
  adventureSports: AdventureSports,
  motocicleQuestion: MotocicleQuestion,
  choosePlan: ChoosePlan,
  informationConfirmationStep: InformationConfirmation,
  companionStep: CompanionStep,
  paymentStep: PaymentStep,
  summaryStep: Summary,
  successStep: Success,
  errorStep: ErrorState,
}

export interface IAdditionalCountries {
  codigo: string
  descricao: string
}

export interface IPassengerContact {
  nome?: string
  celularDDD?: string
  celularNumero?: string
}

export interface IPassengerAddress {
  tipo?: string
  logradouro?: string
  bairro?: string
  cidade?: string
  uf?: string
  complemento?: string
  numero?: string
  numeroCep?: string
  complementoCep?: string
}

export interface IPoliticallyExposedPerson {
  nome?: string
  numeroCpf?: string
  digitoCpf?: string
  grauRelacionamento?: number
  grauParentesco?: number
}

export interface IMainPassenger {
  nome?: string
  email?: string
  dataNascimento?: string
  sexo?: 'M' | 'F'
  numeroCpf?: string
  digitoCpf?: string
  isResidePais?: boolean
  celularDDD?: string
  celularNumero?: string
  contato?: IPassengerContact
  pessoaExposta?: IPoliticallyExposedPerson
  endereco?: IPassengerAddress
}

export interface IPayment {
  codigoBandeira: number
  primeiroNumero: string
  segundoNumero: string
  terceiroNumero: string
  quartoNumero: string
  codigoSeguranca: number
  mesValidade: string
  anoValidade: string
  nomeTitular: string
  quantidadeParcelas: number
  isCartaoPorto: boolean
}

export interface ICompanion extends IMainPassenger {
  id?: number
  status?: boolean
  numeroCpfResponsavel?: string
  digitoCpfResponsavel?: string
  codigoPaisResidente?: string
}

export interface IForm {
  dataIda?: string
  dataVolta?: string
  motivoViagem?: 1
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
  idSimulacao?: string
  codigoCanal?: 1
  nationalDestination?: boolean
  hasOnlyLatinAmericaDestination?: boolean
  hasLatinAmericaCountryAndOtherCountry?: boolean
}
