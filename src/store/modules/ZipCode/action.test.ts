import { ZipCodeType } from './types'

import {
  GetZipCodeeDataRequest,
  GetZipCodeeDataSuccess,
  GetZipCodeeDataFailure,
  GetZipCodeeDataClean,
} from './action'

describe('ZipCode Actions', () => {
  test('if GetZipCodeeDataRequest returns the correct object', () => {
    const zipcode = '72876555'

    expect(GetZipCodeeDataRequest(zipcode)).toEqual({
      type: ZipCodeType.GET_DATA_REQUEST,
      payload: zipcode,
    })
  })

  test('if GetZipCodeeDataSuccess returns the correct object', () => {
    const payload = {
      bairro: 'Rua',
      cep: '72876555',
      cidade: 'Cidade X',
      complementoCep: 'ABC',
      logradouro: 'Logradouro',
      tipoLogradouro: 'Avenida',
      uf: 'DF',
    }

    expect(GetZipCodeeDataSuccess(payload)).toEqual({
      type: ZipCodeType.GET_DATA_SUCCESS,
      payload,
    })
  })

  test('if GetZipCodeeDataFailure returns the correct object', () => {
    expect(GetZipCodeeDataFailure()).toEqual({
      type: ZipCodeType.GET_DATA_FAILURE,
    })
  })

  test('if GetZipCodeeDataClean returns the correct object', () => {
    expect(GetZipCodeeDataClean()).toEqual({
      type: ZipCodeType.GET_DATA_CLEAN,
    })
  })
})
