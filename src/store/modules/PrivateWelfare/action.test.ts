import { Types } from './types'
import PrivateWelfareResponse from './mock.json'

import {
  GetPrivateWelfareRequest,
  GetPrivateWelfareSuccess,
  GetPrivateWelfareFailure,
  GetPrivateWelfareEmpty,
} from './action'

describe('PrivateWelfare action tests', () => {
  it('should call request action', () => {
    expect(GetPrivateWelfareRequest('13150747619')).toEqual({
      type: Types.PRIVATE_WELFARE_REQUEST,
      cpf: '13150747619',
    })
  })
  it('should call success action', () => {
    expect(GetPrivateWelfareSuccess(PrivateWelfareResponse)).toEqual({
      type: Types.PRIVATE_WELFARE_SUCCESS,
      payload: PrivateWelfareResponse,
    })
  })
  it('should call failure action', () => {
    expect(GetPrivateWelfareFailure()).toEqual({
      type: Types.PRIVATE_WELFARE_FAILURE,
    })
  })
  it('should call empty action', () => {
    expect(GetPrivateWelfareEmpty()).toEqual({
      type: Types.PRIVATE_WELFARE_EMPTY,
    })
  })
})
