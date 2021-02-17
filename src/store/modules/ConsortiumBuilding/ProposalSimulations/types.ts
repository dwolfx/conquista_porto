import { IToast } from 'hooks/toast'

export const Types = {
  POST_PROPOSAL_SIMULATIONS_REQUEST: 'POST_PROPOSAL_SIMULATIONS_REQUEST',
  POST_PROPOSAL_SIMULATIONS_SUCCESS: 'POST_PROPOSAL_SIMULATIONS_SUCCESS',
  POST_PROPOSAL_SIMULATIONS_FAILURE: 'POST_PROPOSAL_SIMULATIONS_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: IProposalSimulationsResponse
}

export interface ISimulation {
  codigoGrupo: string
  numeroCota: number
  valorParcela: number
  valorCredito: number
  prazo: number
  fundoReserva: number
  taxaAdministrativa: number
  seguroVida: number
  codBem: string
  informacaoProduto: string
  assembParticipacao: string
  dtAssembleia: string
  dtAvenctoAssembl: string
  totalVagas: number
  taxaAdesao: number
  taxaAdministracao: number
  tiposDeLance: string
  descProduto: string
  fdReserva: number
  tipoGrupo: number
  valorPrimeiraParcela: number
  valorDemaisParcelas: number
  valorAdesao: number
  numeroParticipantes: number
  percentualLanceFixo: number
  percentualLanceLivre: number
  percentualLanceEmbutido: number
  produtoSugerido: string
}

export interface IProposalSimulationsRequest {
  tipoPessoa: number
  tipoBusca: number
  codigoProduto: number
  valorCredito: number
  uf: string
  codigoCanal: string
}

export interface IProposalSimulationsResponse {
  simulacoes: ISimulation[]
}

export interface IPayload {
  type: keyof typeof Types
  payload: IProposalSimulationsRequest
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
  onSuccess?: () => void
}

export interface IConsortiumBuildingProposalSimulation {
  data: IProposalSimulationsResponse | null
  isLoading: boolean
  hasError: boolean
}
