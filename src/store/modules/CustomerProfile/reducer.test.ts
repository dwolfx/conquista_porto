import reducer from './reducer'
import { Types } from './types'

describe('Customer Profile reducer', () => {
  it('should return INITIAL_STATE', () => {
    // @ts-expect-error
    expect(reducer(undefined, {})).toEqual({
      data: null,
      status: '',
      hasError: false,
      isLoading: true,
    })
  })

  it('should handle CUSTOMER_PROFILE_GET_DATA_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          status: '',
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.CUSTOMER_PROFILE_GET_DATA_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      status: '',
      hasError: false,
      isLoading: true,
    })
  })

  it('should handle CUSTOMER_PROFILE_GET_DATA_SUCCESS', () => {
    expect(
      reducer(
        {
          data: null,
          status: '',
          hasError: false,
          isLoading: false,
        },
        {
          type: Types.CUSTOMER_PROFILE_GET_DATA_SUCCESS,
          payload: {
            cpfCnpj: '',
            nomeCliente: '',
            emailCliente: '',
            estado: '',
            dataNascimento: '',
            numeroTelefone: '',
            dddNumeroTelefone: '',
            sexo: '',
          },
        }
      )
    ).toEqual({
      data: {
        cpfCnpj: '',
        customerName: '',
        customerEmail: '',
        customerGender: '',
        customerState: '',
        customerBirthdate: '',
        customerPhoneNumber: '',
        customerAreaCode: '',
      },
      hasError: false,
      status: 'loaded',
      isLoading: false,
    })
  })

  it('should handle CUSTOMER_PROFILE_GET_DATA_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          hasError: false,
          status: '',
          isLoading: false,
        },
        {
          type: Types.CUSTOMER_PROFILE_GET_DATA_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      status: '',
      hasError: true,
      isLoading: false,
    })
  })
})
