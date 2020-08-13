import { Types } from './types'
import {
  PostVirtualKeyboardDataRequest,
  PostVirtualKeyboardDataSuccess,
  PostVirtualKeyboardDataFailure,
  PutVirtualKeyboardDataRequest,
  PutVirtualKeyboardDataSuccess,
  PutVirtualKeyboardDataFailure,
  SetKeyboardLoading,
} from './action'

describe('VirtualKeyboard Actions', () => {
  test('if PostVirtualKeyboardDataRequest returns the correct object', () => {
    expect(PostVirtualKeyboardDataRequest()).toEqual({
      type: Types.POST_REQUEST,
    })
  })

  test('if PostVirtualKeyboardDataSuccess returns the correct object', () => {
    const payload = {}

    expect(PostVirtualKeyboardDataSuccess(payload)).toEqual({
      type: Types.POST_SUCCESS,
      payload,
    })
  })

  test('if PostVirtualKeyboardDataFailure returns the correct object', () => {
    expect(PostVirtualKeyboardDataFailure()).toEqual({
      type: Types.POST_FAILURE,
    })
  })

  test('if PutVirtualKeyboardDataRequest returns the correct object', () => {
    const payload = 'teste'
    expect(PutVirtualKeyboardDataRequest(payload)).toEqual({
      type: Types.VALIDATE_REQUEST,
      payload,
    })
  })

  test('if PutVirtualKeyboardDataSuccess returns the correct object', () => {
    expect(PutVirtualKeyboardDataSuccess()).toEqual({
      type: Types.VALIDATE_SUCCESS,
    })
  })

  test('if PutVirtualKeyboardDataFailure returns the correct object', () => {
    expect(PutVirtualKeyboardDataFailure()).toEqual({
      type: Types.VALIDATE_FAILURE,
    })
  })

  test('if SetKeyboardLoading returns the correct object', () => {
    const payload = true
    expect(SetKeyboardLoading(payload)).toEqual({
      type: Types.SET_LOADING,
      payload,
    })
  })
})
