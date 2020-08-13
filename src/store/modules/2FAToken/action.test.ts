import {
  Types,
  ISummartPayload,
  IValidateTokenSignaturePayload,
  IGeneratePayload,
} from './types'
import {
  Post2FATokenDataRequest,
  Post2FATokenDataSuccess,
  Post2FATokenDataFailure,
  Put2FATokenDataRequest,
  Put2FATokenDataSuccess,
  Put2FATokenDataFailure,
  Get2FADataRequest,
  Get2FADataSuccess,
  Get2FADataFailure,
  Run2FAInitialRequest,
  ValidateTokenNSignature,
  SaveToken,
  SetTokenLoading,
} from './action'

describe('2FAToken Actions', () => {
  test('if Post2FATokenDataRequest returns the correct object', () => {
    const type = 'email_otp'
    const addToast = () => {}
    expect(Post2FATokenDataRequest(type, addToast)).toEqual({
      type: Types.POST_REQUEST,
      payload: {
        type,
        addToast,
      },
    })
  })

  test('if Post2FATokenDataSuccess returns the correct object', () => {
    expect(Post2FATokenDataSuccess()).toEqual({
      type: Types.POST_SUCCESS,
    })
  })

  test('if Post2FATokenDataFailure returns the correct object', () => {
    expect(Post2FATokenDataFailure()).toEqual({
      type: Types.POST_FAILURE,
    })
  })

  test('if Put2FATokenDataRequest returns the correct object', () => {
    const payload = ''
    expect(Put2FATokenDataRequest(payload)).toEqual({
      type: Types.VALIDATE_REQUEST,
      payload,
    })
  })

  test('if Put2FATokenDataSuccess returns the correct object', () => {
    expect(Put2FATokenDataSuccess()).toEqual({
      type: Types.VALIDATE_SUCCESS,
    })
  })

  test('if Put2FATokenDataFailure returns the correct object', () => {
    expect(Put2FATokenDataFailure()).toEqual({
      type: Types.VALIDATE_FAILURE,
    })
  })

  test('if Get2FADataRequest returns the correct object', () => {
    expect(Get2FADataRequest()).toEqual({
      type: Types.GET_PERSONALDATA_REQUEST,
    })
  })

  test('if Get2FADataSuccess returns the correct object', () => {
    const payload = {}
    expect(Get2FADataSuccess(payload)).toEqual({
      type: Types.GET_PERSONALDATA_SUCCESS,
      payload,
    })
  })

  test('if Get2FADataFailure returns the correct object', () => {
    expect(Get2FADataFailure()).toEqual({
      type: Types.GET_PERSONALDATA_FAILURE,
    })
  })

  test('if Run2FAInitialRequest returns the correct object', () => {
    const payload: IGeneratePayload = {
      addToast: () => {},
      onSuccess: () => {},
    }
    expect(Run2FAInitialRequest(payload)).toEqual({
      type: Types.RUN_INITIAL_REQUEST,
      payload,
    })
  })

  test('if ValidateTokenNSignature returns the correct object', () => {
    const payload: IValidateTokenSignaturePayload = {
      signature: '',
      onSuccess: () => {},
      onError: () => {},
      addToast: () => {},
      goToPreviousStep: () => {},
    }
    expect(ValidateTokenNSignature(payload)).toEqual({
      type: Types.VALIDATE_TOKEN_SIGNATURE,
      payload,
    })
  })

  test('if SaveToken returns the correct object', () => {
    const payload = {
      type: 'sms_otp',
      value: '',
    }
    expect(
      SaveToken({
        type: 'sms_otp',
        value: '',
      })
    ).toEqual({
      type: Types.SAVE_TOKEN,
      payload,
    })
  })

  test('if SetTokenLoading returns the correct object', () => {
    expect(
      SetTokenLoading({
        isLoadingGetInfo: true,
      })
    ).toEqual({
      type: Types.SET_LOADING,
      payload: {
        isLoadingGetInfo: true,
      },
    })
  })
})
