import reducer from './reducer'
import { Types } from './types'

describe('Investment/Position reducer', () => {
  const INITIAL_STATE = {
    data: null,
    displayInformation: false,
    idFund: null,
    hasError: false,
    isLoading: false,
  }
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it('should handle ADD_REQUEST', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.ADD_REQUEST,
      })
    ).toEqual({
      ...INITIAL_STATE,
      isLoading: true,
    })
  })

  it('should handle ADD_SUCCESS', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.ADD_SUCCESS,
        payload: [{ name: 'Aqui tem coragi' }],
      })
    ).toEqual({
      ...INITIAL_STATE,
      data: [{ name: 'Aqui tem coragi' }],
    })
  })

  it('should handle ADD_FAILURE', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.ADD_FAILURE,
      })
    ).toEqual({
      ...INITIAL_STATE,
      hasError: true,
    })
  })

  it('should handle DISPLAY_INFORMATION', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.DISPLAY_INFORMATION,
        displayInformation: true,
      })
    ).toEqual({
      ...INITIAL_STATE,
      displayInformation: true,
    })
  })

  it('should handle SET_ID_FUND', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.SET_ID_FUND,
        idFund: '5105',
      })
    ).toEqual({
      ...INITIAL_STATE,
      idFund: '5105',
    })
  })
})
