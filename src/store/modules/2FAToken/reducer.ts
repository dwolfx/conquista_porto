import { Types } from './types'

const INITIAL_STATE = {
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

export default function(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Types.POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case Types.POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case Types.POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    case Types.GET_PERSONALDATA_REQUEST:
      return {
        ...state,
        isLoadingGetInfo: true,
        hasError: false,
      }
    case Types.GET_PERSONALDATA_SUCCESS:
      const { payload } = action
      return {
        ...state,
        isLoadingGetInfo: false,
        data: [...payload],
      }
    case Types.GET_PERSONALDATA_FAILURE:
      return {
        ...state,
        isLoadingGetInfo: false,
        hasError: true,
      }
    case Types.SAVE_TOKEN:
      return {
        ...state,
        token: { ...action.payload },
      }
    default:
      return state
  }
}
