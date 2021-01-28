import { StepComponentProps } from 'hooks/FluxManagement/types'
import { IToast } from 'hooks/toast'

export const Types = {
  POST_TRIP_INSURANCE_PROPOSAL_REQUEST: 'POST_TRIP_INSURANCE_PROPOSAL_REQUEST',
  POST_TRIP_INSURANCE_PROPOSAL_SUCCESS: 'POST_TRIP_INSURANCE_PROPOSAL_SUCCESS',
  POST_TRIP_INSURANCE_PROPOSAL_FAILURE: 'POST_TRIP_INSURANCE_PROPOSAL_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: ITripInsuranceProposalResponse
}

interface IMainPassenger {
  nome?: string
  email?: string
  dataNascimento?: string
  sexo?: 'M' | 'F'
  numeroCpf?: string
  digitoCpf?: string
  isResidePais?: boolean
  celularDDD?: string
  celularNumero?: string
  contato?: {
    nome?: string
    celularDDD?: string
    celularNumero?: string
  }
  pessoaExposta?: {
    grauRelacionamento?: number
    nome?: string
    numeroCpf?: string
    digitoCpf?: string
    grauParentesco?: number
  }
  endereco?: {
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
}

interface ICompanion extends IMainPassenger {
  numeroCpfResponsavel?: string
  digitoCpfResponsavel?: string
  codigoPaisResidente?: string
}

interface IPayment {
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

export interface ITripInsuranceProposalRequest {
  dataIda?: string
  dataVolta?: string
  motivoViagem?: number
  isPraticaAventura?: boolean
  isMotocicleta?: boolean
  qtdPassagMenorSetentaAnos?: number
  qtdPassagMaiorSetentaAnos?: number
  codigoUfOrigem?: string
  codigoPaisDestino?: string | string[]
  passageiroPrincipal?: IMainPassenger
  pacoteEscolhido?: string
  valorSeguro?: number
  acompanhantes?: ICompanion[]
  pagamento?: IPayment
  isAceiteTermos?: boolean
  isCienteMoto?: boolean
  idSimulacao?: number
}

export interface ITripInsuranceProposalResponse {
  Message: {
    TipoCritica: string
    Mensagem: string
    Validacoes?: {
      Validacao: string
    }
  }
  proposta: {
    origemProposta: string
    numeroProposta: string
    listaPassageirosProcessados: {
      listaPassageirosProcessados: {
        origemProposta: string
        nomePassageiro: string
        isEmissao: boolean
        urlCartaGarantia: string
        descricaoSituacaoProposta: string
        numeroProposta: string
      }
    }
  }
}

export interface ITripInsuranceProposal {
  data: ITripInsuranceProposalResponse | null
  isLoading: boolean
  hasError: boolean
}

export interface IPayload {
  type: keyof typeof Types
  payload: ITripInsuranceProposalRequest
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
  onSuccess: (element: React.FC<StepComponentProps>) => void
  Step: React.FC<StepComponentProps>
  setRetries: () => void
}
