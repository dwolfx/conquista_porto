import { Types } from '../types'
import {
  GetAlignmentTermsDataRequest,
  GetAlignmentTermsDataSuccess,
  GetAlignmentTermsDataFailure,
} from './action'

describe('Investment/FinancialApplication/AlignmentTerms actions', () => {
  test('if GetAlignmentTermsDataRequest returns the correct object', () => {
    const payload = {
      data: {
        data_operacao: '',
        valor_bruto: 0,
        id_fundo: '',
      },
      onSuccess: (data: {}) => {},
      onErrorToast: (toast: {}) => {},
    }
    expect(GetAlignmentTermsDataRequest(payload)).toEqual({
      payload,
      type: Types.ALIGNMENT_TERMS_DATA_GET_REQUEST,
    })
  })

  test('if GetAlignmentTermsDataSuccess returns the correct object', () => {
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
    expect(GetAlignmentTermsDataSuccess(payload)).toEqual({
      type: Types.ALIGNMENT_TERMS_DATA_GET_SUCCESS,
      payload,
    })
  })

  test('if GetAlignmentTermsDataFailure returns the correct object', () => {
    const message = {
      tipo_critica: '',
      mensagem: '',
    }
    expect(GetAlignmentTermsDataFailure({ message })).toEqual({
      message,
      type: Types.ALIGNMENT_TERMS_DATA_GET_FAILURE,
    })
  })
})
