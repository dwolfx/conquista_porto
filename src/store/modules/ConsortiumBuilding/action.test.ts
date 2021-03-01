import { Types } from './types'
import {
  GetConsortiumBuildingDataRequest,
  GetConsortiumBuildingDataSuccess,
  GetConsortiumBuildingDataFailure,
  GetConsortiumBuildingCloseLayer,
} from './action'

describe('Consortium Building Actions', () => {
  test('if GetConsortiumBuildingDataRequest returns the correct object', () => {
    // @ts-expect-error
    expect(GetConsortiumBuildingDataRequest()).toEqual({
      type: Types.GET_REQUEST,
    })
  })

  test('if GetConsortiumBuildingDataSuccess returns the correct object', () => {
    const payload = {}

    // @ts-expect-error
    expect(GetConsortiumBuildingDataSuccess(payload)).toEqual({
      type: Types.GET_SUCCESS,
      payload,
    })
  })

  test('if GetConsortiumBuildingDataFailure returns the correct object', () => {
    expect(GetConsortiumBuildingDataFailure()).toEqual({
      type: Types.GET_FAILURE,
    })
  })

  test('if GetConsortiumBuildingCloseLayer returns the correct status', () => {
    const close = true
    expect(GetConsortiumBuildingCloseLayer(close)).toEqual({
      type: Types.GET_CLOSE_LAYER,
      close,
    })
  })
})
