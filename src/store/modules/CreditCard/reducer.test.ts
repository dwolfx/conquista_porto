import reducer from './reducer'
import { ICreditCardState, Types } from './types'

const INITIAL_STATE: ICreditCardState = {
  data: null,
  hasError: false,
  isLoading: false,
  isCreationLayerOpen: false,
  clientData: null,
  isClientDataLoading: false,
  hasClientDataError: false,
}

describe('Credit Card reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE)
  })

  it('should handle GET_REQUEST', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.GET_REQUEST,
      })
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: true,
      isCreationLayerOpen: false,
      clientData: null,
      isClientDataLoading: false,
      hasClientDataError: false,
    })
  })

  it('should handle GET_SUCCESS', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.GET_SUCCESS,
        payload: [{ name: 'Aqui tem coragi' }],
      })
    ).toEqual({
      data: [{ name: 'Aqui tem coragi' }],
      hasError: false,
      isLoading: false,
      isCreationLayerOpen: false,
      clientData: null,
      isClientDataLoading: false,
      hasClientDataError: false,
    })
  })

  it('should handle GET_FAILURE', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.GET_FAILURE,
      })
    ).toEqual({
      data: null,
      hasError: true,
      isLoading: false,
      isCreationLayerOpen: false,
      clientData: null,
      isClientDataLoading: false,
      hasClientDataError: false,
    })
  })
  it('should handle OPEN_CREDIT_CARD_CREATION', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.OPEN_CREDIT_CARD_CREATION,
      })
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
      isCreationLayerOpen: true,
      clientData: null,
      isClientDataLoading: false,
      hasClientDataError: false,
    })
  })
  it('should handle CLOSE_CREDIT_CARD_CREATION', () => {
    expect(
      reducer(INITIAL_STATE, {
        type: Types.CLOSE_CREDIT_CARD_CREATION,
      })
    ).toEqual({
      data: null,
      hasError: false,
      isLoading: false,
      isCreationLayerOpen: false,
      clientData: null,
      isClientDataLoading: false,
      hasClientDataError: false,
    })
  })
})
