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

  it('should handle POSITION_GET_DATA_REQUEST', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.POSITION_GET_DATA_REQUEST,
      })
    ).toEqual({
      ...INITIAL_STATE,
      isLoading: true,
    })
  })

  it('should handle POSITION_GET_DATA_SUCCESS', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.POSITION_GET_DATA_SUCCESS,
        payload: [{ name: 'Aqui tem coragi' }],
      })
    ).toEqual({
      ...INITIAL_STATE,
      data: [{ name: 'Aqui tem coragi' }],
    })
  })

  it('should handle POSITION_GET_DATA_FAILURE', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.POSITION_GET_DATA_FAILURE,
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
