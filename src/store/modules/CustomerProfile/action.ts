import { Types } from './types'

interface ICustomerProfile {
  cpfCnpj: string
  nomeCliente: string
  emailCliente: string
}

export function GetCustomerProfileRequest(cpf: string) {
  return {
    type: Types.CUSTOMER_PROFILE_GET_DATA_REQUEST,
    payload: { cpf },
  }
}

export function GetDataSuccess(payload: ICustomerProfile) {
  return {
    type: Types.CUSTOMER_PROFILE_GET_DATA_SUCCESS,
    payload,
  }
}

export function GetDataFailure() {
  return {
    type: Types.CUSTOMER_PROFILE_GET_DATA_FAILURE,
  }
}
