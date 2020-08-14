import { Types } from './types'
import {
  GetSuitabilityRequestAndRedirect,
  GetSuitabilityDataSuccess,
  GetSuitabilityDataNoContent,
  SetSuitabilityLoading,
  GetSuitabilityDataFailure,
} from './action'

describe('Suitability actions', () => {
  test('if GetSuitabilityRequestAndRedirect returns the correct object', () => {
    const payload = {
      cpf: '3333333333',
      link: 'https://www.google.com',
      goalType: '1',
    }
    expect(GetSuitabilityRequestAndRedirect(payload)).toEqual({
      type: Types.GET_REQUEST_AND_REDIRECT,
      payload: {
        cpf: '3333333333',
        link: 'https://www.google.com',
        goalType: '1',
      },
    })
  })

  test('if GetSuitabilityDataSuccess returns the correct object', () => {
    const payload = {
      cpf: '3333333333',
      link: 'https://www.google.com',
      goalType: '1',
    }
    expect(GetSuitabilityDataSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetSuitabilityDataNoContent returns the correct object', () => {
    expect(GetSuitabilityDataNoContent()).toEqual({
      type: Types.GET_NO_CONTENT,
    })
  })

  test('if SetSuitabilityLoading returns the correct object', () => {
    expect(SetSuitabilityLoading(true)).toEqual({
      type: Types.SET_LOADING,
      isLoading: true,
    })
  })

  test('if GetSuitabilityDataFailure returns the correct object', () => {
    expect(GetSuitabilityDataFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })
})
