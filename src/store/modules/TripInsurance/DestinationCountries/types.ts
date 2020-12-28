export const Types = {
  GET_DESTINATION_CONTRIES_REQUEST: 'GET_DESTINATION_CONTRIES_REQUEST',
  GET_DESTINATION_CONTRIES_SUCCESS: 'GET_DESTINATION_CONTRIES_SUCCESS',
  GET_DESTINATION_CONTRIES_FAILURE: 'GET_DESTINATION_CONTRIES_FAILURE',
}

export interface IAction {
  type: keyof typeof Types
  payload: IPayload
}

export interface IDestinationCountry {
  codigo: string
  descricao: string
}

export interface IFilteredDestinationCountry {
  text: string
  id: number
  value: string
}

export interface IPayload {
  Message: {
    TipoCritica: string
    Mensagem: string
  }
  ViagemPais: {
    destinos: IFilteredDestinationCountry[]
  }
}
