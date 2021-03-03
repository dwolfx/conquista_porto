import { Types } from './types'
import {
  GetConsortiumVehicleDataRequest,
  GetConsortiumVehicleDataSuccess,
  GetConsortiumVehicleDataFailure,
} from './action'

describe('Consortium Vehicle Actions', () => {
  test('if GetConsortiumVehicleDataRequest returns the correct object', () => {
    // @ts-expect-error
    expect(GetConsortiumVehicleDataRequest()).toEqual({
      type: Types.GET_REQUEST,
    })
  })

  test('if GetConsortiumVehicleDataSuccess returns the correct object', () => {
    const payload = {}

    // @ts-expect-error
    expect(GetConsortiumVehicleDataSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetConsortiumVehicleDataFailure returns the correct object', () => {
    expect(GetConsortiumVehicleDataFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })
})
