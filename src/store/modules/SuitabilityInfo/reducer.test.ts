import reducer from './reducer'
import { Types, IAction } from './types'

const defaultState = {
  data: null,
  status: '',
  hasError: false,
  isLoading: false,
}

const defaultAction: IAction = {
  type: 'SUITABILITY_INFO_GET_DATA_FAILURE',
  payload: {
    CotistaContaOrdemPortoPar: 'string',
    codigo_status_cotista: 'string',
    id_cotista: 'string',
    investidor_profissional: 'string',
    investidor_qualificado: 'string',
    status_cotista: true,
    status_data_vencimento_cadastro: true,
    status_data_vigencia_suitability: true,
    status_possui_suitability: true,
    isValid: true,
  },
}

describe('Withdraw Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, defaultAction)).toEqual({
      ...defaultState,
      hasError: true,
    })
  })

  it('should handle SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          ...defaultAction,
          type: 'SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE',
        }
      )
    ).toEqual({
      ...defaultState,
      isLoading: true,
    })
  })

  it('should handle SUITABILITY_INFO_GET_DATA_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          ...defaultAction,
          type: 'SUITABILITY_INFO_GET_DATA_REQUEST',
        }
      )
    ).toEqual({
      ...defaultState,
      isLoading: true,
    })
  })

  it('should handle SUITABILITY_INFO_GET_DATA_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          ...defaultAction,
          type: 'SUITABILITY_INFO_GET_DATA_SUCCESS',
        }
      )
    ).toEqual({
      ...defaultState,
      data: defaultAction.payload,
      status: 'loaded',
      isLoading: false,
    })
  })

  it('should handle SUITABILITY_INFO_GET_DATA_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          ...defaultAction,
          type: 'SUITABILITY_INFO_GET_DATA_FAILURE',
        }
      )
    ).toEqual({
      ...defaultState,
      data: null,
      isLoading: false,
      hasError: true,
    })
  })
})
