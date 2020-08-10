import { Types } from './types'
import {
  GetCustomerProfileRequest,
  GetDataFailure,
  GetDataSuccess,
} from './action'

describe('Customer Profile actions', () => {
  test('if GetCustomerProfileRequest returns the correct object', () => {
    expect(GetCustomerProfileRequest()).toEqual({
      type: Types.CUSTOMER_PROFILE_GET_DATA_REQUEST,
    })
  })

  test('if GetCustomerProfileDataSuccess returns the correct object', () => {
    const payload = {
      cpfCnpj: '',
      nomeCliente: '',
      emailCliente: '',
      estado: '',
      dataNascimento: '',
    }
    expect(GetDataSuccess(payload)).toEqual({
      type: Types.CUSTOMER_PROFILE_GET_DATA_SUCCESS,
      payload,
    })
  })

  test('if GetCustomerProfileDataFailure returns the correct object', () => {
    expect(GetDataFailure()).toEqual({
      type: Types.CUSTOMER_PROFILE_GET_DATA_FAILURE,
    })
  })
})
