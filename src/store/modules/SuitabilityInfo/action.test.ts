import { Types, ISuitabilityInfo } from './types'
import {
  GetSuitabilityInfoRequest,
  GetSuitabilityInfoAndValidate,
  GetDataSuccess,
  GetDataFailure,
} from './action'

describe('SuitabilityInfo Actions', () => {
  test('if GetSuitabilityInfoRequest returns the correct object', () => {
    const cpf = '11111111111'
    expect(GetSuitabilityInfoRequest(cpf)).toEqual({
      type: Types.SUITABILITY_INFO_GET_DATA_REQUEST,
      payload: { cpf },
    })
  })

  test('if GetSuitabilityInfoAndValidate returns the correct object', () => {
    const payload = {
      onSuccess: () => {},
      buttonType: 'investir',
      onErrorToast: () => {},
    }

    expect(
      GetSuitabilityInfoAndValidate(
        payload.onSuccess,
        'investir',
        payload.onErrorToast
      )
    ).toEqual({
      type: Types.SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE,
      payload,
    })
  })

  test('if GetDataSuccess returns the correct object', () => {
    const payload: ISuitabilityInfo = {
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
    }
    expect(GetDataSuccess(payload)).toEqual({
      type: Types.SUITABILITY_INFO_GET_DATA_SUCCESS,
      payload,
    })
  })

  test('if GetDataFailure returns the correct object', () => {
    expect(GetDataFailure()).toEqual({
      type: Types.SUITABILITY_INFO_GET_DATA_FAILURE,
    })
  })
})
