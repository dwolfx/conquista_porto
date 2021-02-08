import { CEPResponse } from 'pages/CreditCard/Creation/types'
import reducer from './reducer'
import { ZipCodeType } from './types'

describe('ZipCode Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle GET_DATA_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: ZipCodeType.GET_DATA_REQUEST,
          payload: '72876555',
        }
      )
    ).toEqual({
      data: null,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle GET_DATA_SUCCESS', () => {
    const payload: CEPResponse = {
      bairro: 'Rua',
      cep: '72876555',
      cidade: 'Cidade X',
      complementoCep: 'ABC',
      logradouro: 'Logradouro',
      tipoLogradouro: 'Avenida',
      uf: 'DF',
    }

    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: ZipCodeType.GET_DATA_SUCCESS,
          payload: { data: payload },
        }
      )
    ).toEqual({
      data: {
        data: payload,
      },
      isLoading: false,
      hasError: false,
    })
  })

  it('should handle GET_DATA_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: true,
        },
        {
          type: ZipCodeType.GET_DATA_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      isLoading: false,
      hasError: true,
    })
  })

  it('should handle GET_DATA_CLEAN', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: ZipCodeType.GET_DATA_CLEAN,
        }
      )
    ).toEqual({
      data: null,
      isLoading: false,
      hasError: false,
    })
  })
})
