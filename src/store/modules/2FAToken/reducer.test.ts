import reducer from './reducer'
import { Types } from './types'

const defaultState = {
  isLoading: false,
  isLoadingGetInfo: false,
  hasError: false,
  token: {
    value: '',
    type: 'sms_otp',
  },
  data: [
    {
      value:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..RHjW8kd_yPr3I4RMYdc7Xw.dyW3YqgAGXb39pUGQY1Rhw.O-J7ZjDuhVpcd-D-GBh9YQ',
      name: 'assinatura',
    },
    {
      value: '16955255825',
      name: 'sms_otp',
    },
    {
      value: 'ph@sciensa.com.br',
      name: 'email_otp',
    },
  ],
}

describe('2FAToken Reducer', () => {
  it('should return INITIAL_STATE', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('should handle POST_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoading: true,
      hasError: false,
    })
  })

  it('should handle POST_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_SUCCESS,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoading: false,
    })
  })

  it('should handle POST_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.POST_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoading: false,
      hasError: true,
    })
  })

  it('should handle GET_PERSONALDATA_REQUEST', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_PERSONALDATA_REQUEST,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingGetInfo: true,
      hasError: false,
    })
  })

  it('should handle GET_PERSONALDATA_SUCCESS', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_PERSONALDATA_SUCCESS,
          payload: [],
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingGetInfo: false,
      data: [],
    })
  })

  it('should handle GET_PERSONALDATA_FAILURE', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.GET_PERSONALDATA_FAILURE,
        }
      )
    ).toEqual({
      ...defaultState,
      isLoadingGetInfo: false,
      hasError: true,
    })
  })

  it('should handle SAVE_TOKEN', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.SAVE_TOKEN,
          payload: {},
        }
      )
    ).toEqual({
      ...defaultState,
      token: {},
    })
  })

  it('should handle SET_LOADING', () => {
    expect(
      reducer(
        {
          ...defaultState,
        },
        {
          type: Types.SET_LOADING,
          payload: true,
        }
      )
    ).toEqual({
      ...defaultState,
    })
  })
})
