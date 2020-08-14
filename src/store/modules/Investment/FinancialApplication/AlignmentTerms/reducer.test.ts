import reducer from './reducer'
import { Types } from '../types'

describe('Investment/FinancialApplication/AlignmentTerms Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual({
      data: null,
      isLoading: false,
      hasError: false,
    })
  })
  it('should handle ALIGNMENT_TERMS_DATA_GET_REQUEST', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.ALIGNMENT_TERMS_DATA_GET_REQUEST,
        }
      )
    ).toEqual({
      data: null,
      isLoading: true,
      hasError: false,
    })
  })
  it('should handle ALIGNMENT_TERMS_DATA_GET_SUCCESS', () => {
    const payload = {
      enquadramento_ordem_cotista: {
        status_enquadramento: '',
        nota_rating_cotista: 0,
        nota_rating_carteira: 0,
        fundos_desenquadrados: {
          fundo_desenquadrado: [
            {
              id_carteira: 0,
              nome_fundo: '',
              nota_rating: 0,
            },
          ],
        },
      },
    }

    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.ALIGNMENT_TERMS_DATA_GET_SUCCESS,
          payload,
        }
      )
    ).toEqual({
      data: payload,
      hasError: false,
      isLoading: false,
    })
  })
  it('should handle ALIGNMENT_TERMS_DATA_GET_FAILURE', () => {
    expect(
      reducer(
        {
          data: null,
          isLoading: false,
          hasError: false,
        },
        {
          type: Types.ALIGNMENT_TERMS_DATA_GET_FAILURE,
        }
      )
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
    })
  })
})
