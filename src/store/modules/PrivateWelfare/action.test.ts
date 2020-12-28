import PrivateWelfareResponse from 'mocks/privateWelfare.json'
import privateWelfateWithStatusPREResponse from 'mocks/privateWelfateWithStatusPRE.json'
import { Types } from './types'

import {
  GetPrivateWelfareRequest,
  GetPrivateWelfareSuccess,
  GetPrivateWelfareFailure,
  GetPrivateWelfareEmpty,
  GetPrivateWelfareWithStatusPRERequest,
  GetPrivateWelfareWithStatusPRESuccess,
  GetPrivateWelfareWithStatusPREFailure,
} from './action'

describe('PrivateWelfare action tests', () => {
  describe('PrivateWelfare', () => {
    it('should call request action', () => {
      expect(GetPrivateWelfareRequest()).toEqual({
        type: Types.PRIVATE_WELFARE_REQUEST,
      })
    })
    it('should call success action', () => {
      // @ts-ignore
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
  describe('PrivateWelfareWithStatusPRE', () => {
    it('should call request action', () => {
      expect(GetPrivateWelfareWithStatusPRERequest()).toEqual({
        type: Types.PRIVATE_WELFARE_WITH_STATUS_PRE_REQUEST,
      })
    })
    it('should call success action', () => {
      expect(
        GetPrivateWelfareWithStatusPRESuccess(
          privateWelfateWithStatusPREResponse
        )
      ).toEqual({
        type: Types.PRIVATE_WELFARE_WITH_STATUS_PRE_SUCCESS,
        payload: privateWelfateWithStatusPREResponse,
      })
    })
    it('should call failure action', () => {
      expect(GetPrivateWelfareWithStatusPREFailure()).toEqual({
        type: Types.PRIVATE_WELFARE_WITH_STATUS_PRE_FAILURE,
      })
    })
  })
})
