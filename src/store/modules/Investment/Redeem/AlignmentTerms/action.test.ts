import { Types } from './types'
import {
  GetRedeemAlignmentTermsRequest,
  GetRedeemAlignmentTermsSuccess,
  GetRedeemAlignmentTermsFailure,
} from './action'

describe('Investment/Redeem/AlignmentTerms actions', () => {
  test('if GetRedeemAlignmentTermsRequest returns the correct object', () => {
    const payload = {
      data: {
        data_operacao: '',
        id_fundo: '',
        valor_bruto: '',
        tipo_operacao: '',
      },
      onSuccess: (data: {}) => {},
      onErrorToast: (toast: {}) => {},
    }
    expect(GetRedeemAlignmentTermsRequest(payload)).toEqual({
      payload,
      type: Types.REDEEM_TERMS_DATA_REQUEST,
    })
  })
  test('if GetRedeemAlignmentTermsSuccess returns the correct object', () => {
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
    expect(GetRedeemAlignmentTermsSuccess(payload)).toEqual({
      type: Types.REDEEM_TERMS_DATA_SUCCESS,
      payload,
    })
  })
  test('if GetRedeemAlignmentTermsFailure returns the correct object', () => {
    const message = {
      tipo_critica: '',
      mensagem: '',
    }
    expect(GetRedeemAlignmentTermsFailure({ message })).toEqual({
      message,
      type: Types.REDEEM_TERMS_DATA_FAILURE,
    })
  })
})
