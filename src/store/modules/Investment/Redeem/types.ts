export const Types = {
  DATA_GET_REQUEST: 'DATA_GET_REQUEST',
  DATA_GET_SUCCESS: 'DATA_GET_SUCCESS',
  DATA_GET_FAILURE: 'DATA_GET_FAILURE' 
}

export interface IGetFinancialApplicationAction {
  type: keyof typeof Types
  payload: any
}

export interface IError {
  message: {
    tipo_critica: string
    mensagem: string
  }
}

export interface IState {
  suitabilityInfo: { data: Object }
  financialApplicationGetData: { data: Object }
  auth: Object
}
