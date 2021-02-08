export const Types = {
  GET_STATES_REQUEST: 'GET_STATES_REQUEST',
  GET_STATES_SUCCESS: 'GET_STATES_SUCCESS',
  GET_STATES_FAILURE: 'GET_STATES_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: IPayload
}

export interface IState {
  sigla: string
  nome: string
}

export interface IPayload {
  uf: IState[]
}