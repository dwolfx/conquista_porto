import { Types } from './types'
import { IVehicleFinancing } from './iVehicleFinancing'

import {
  GetVehicleFinancingSuccess,
  GetVehicleFinancingDataRequest,
  GetVehicleFinancingFailure,
} from './action'

describe('Credit Card actions', () => {
  test('if GetVehicleFinancingDataRequest returns the correct object', () => {
    expect(GetVehicleFinancingDataRequest()).toEqual({
      type: Types.GET_REQUEST,
    })
  })

  test('if GetVehicleFinancingSuccess returns the correct object', () => {
    const payload: IVehicleFinancing[] | [] = []
    expect(GetVehicleFinancingSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetVehicleFinancingFailure returns the correct object', () => {
    expect(GetVehicleFinancingFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })
})
