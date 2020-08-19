import alignmentTermsReducerFunction from './reducer'
import { Types } from './types'

describe('Investment/Redeem/AlignmentTerms reducer', () => {
  describe('alignmentTermsReducerFunction', () => {
    it('should return INITIAL_STATE', () => {
      expect(alignmentTermsReducerFunction(undefined, {})).toEqual({
        data: null,
        isLoading: false,
        hasError: false,
      })
    })
    it('should handle DATA_GET_REQUEST', () => {
      expect(
        alignmentTermsReducerFunction(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.REDEEM_TERMS_DATA_REQUEST,
          }
        )
      ).toEqual({
        data: null,
        isLoading: true,
        hasError: false,
      })
    })
    it('should handle DATA_GET_SUCCESS', () => {
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
        alignmentTermsReducerFunction(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.REDEEM_TERMS_DATA_SUCCESS,
            payload,
          }
        )
      ).toEqual({
        data: payload,
        hasError: false,
        isLoading: false,
      })
    })
    it('should handle DATA_GET_FAILURE', () => {
      expect(
        alignmentTermsReducerFunction(
          {
            data: null,
            isLoading: false,
            hasError: false,
          },
          {
            type: Types.REDEEM_TERMS_DATA_FAILURE,
          }
        )
      ).toEqual({
        data: null,
        hasError: true,
        isLoading: false,
      })
    })
  })
})
