import AdventureSports from './AdventureSports'
import PassengerStep from './PassengerStep'
import OriginTrip from './OriginTripStep'
import CoverageDate from './CoverageDate'
import MotocicleQuestion from './MotocicleQuestion'
import ChoosePlan from './ChoosePlan'
import Status from '../commons/RequestProposalStatus'

export const Steps = {
  status: Status,
  originTrip: OriginTrip,
  coverageDate: CoverageDate,
  passengerStep: PassengerStep,
  adventureSports: AdventureSports,
  motocicleQuestion: MotocicleQuestion,
  choosePlan: ChoosePlan,
}

export interface IAdditionalCountries {
  codigo: string
  descricao: string
}

export interface IPassengerContact {
  nome: string
  celularDDD: string
  celularNumero: string
}

export interface IPassengerAddress {
  tipo: string
  logradouro: string
  bairro: string
  cidade: string
  uf: string
  complemento: string
  numero: string
  numeroCep: string
  complementoCep: string
}

export interface IPoliticallyExposedPerson {
  nome: string
  numeroCpf: string
  digitoCpf: string
  // AGUARDANDO RESPOSTA DA PORTO PARA OS CAMPOS ABAIXO
  grauRelacionamento: number
  grauParentesco: number
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
  // AGUARDANDO RESPOSTA DA PORTO PARA CÓDIGO BANDEIRA
  codigoBandeira: number
  primeiroNumero: number
  segundoNumero: string
  terceiroNumero: string
  quartoNumero: string
  codigoSeguranca: number
  mesValidade: string
  anoValidade: number
  nomeTitular: string
  quantidadeParcelas: number
  isCartaoPorto: boolean
}

export interface ICompanion extends IMainPassenger {
  numeroCpfResponsavel: string
  digitoCpfResponsavel: string
  codigoPaisResidente: string
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
  idSimulacao?: number
  codigoCanal?: 1
  nationalDestination?: boolean
}
