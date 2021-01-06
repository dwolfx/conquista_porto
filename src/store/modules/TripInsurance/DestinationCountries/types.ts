export const Types = {
  GET_DESTINATION_COUNTRIES_REQUEST: 'GET_DESTINATION_COUNTRIES_REQUEST',
  GET_DESTINATION_COUNTRIES_SUCCESS: 'GET_DESTINATION_COUNTRIES_SUCCESS',
  GET_DESTINATION_COUNTRIES_FAILURE: 'GET_DESTINATION_COUNTRIES_FAILURE',
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
