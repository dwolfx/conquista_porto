export const Types = {
  GET_JOBS_REQUEST: 'GET_JOBS_REQUEST',
  GET_JOBS_SUCCESS: 'GET_JOBS_SUCCESS',
  GET_JOBS_FAILURE: 'GET_JOBS_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: IJobsConsortiumBuilding
}

export interface IJobs {
  codigo: string
  descricao: string
}

export interface IJobsConsortiumBuilding {
  profissoes: IJobs[]
}

export interface IJobsConsortiumBuildingState {
  readonly data: IJobsConsortiumBuilding | null
  readonly isLoading: boolean
  readonly hasError: boolean
}
