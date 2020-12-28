import { Types } from './types'

import {
  GetInvestmentDetailsFailure,
  GetInvestmentDetailsRequest,
  GetInvestmentDetailsSuccess,
} from './action'

describe('Investment Details actions', () => {
  it('GetInvestmentDetailsRequest should return the correct object', () => {
    // @ts-expect-error
    expect(GetInvestmentDetailsRequest('5001')).toEqual({
      type: Types.INVESTMENT_DETAILS_ADD_REQUEST,
      fundId: '5001',
    })
  })
  it('GetInvestmentDetailsSuccess should return the correct object', () => {
    const payload = {}
    expect(GetInvestmentDetailsSuccess(payload)).toEqual({
      type: Types.INVESTMENT_DETAILS_ADD_SUCCESS,
      payload,
    })
  })
  it('GetInvestmentDetailsFailure should return the correct object', () => {
    expect(GetInvestmentDetailsFailure()).toEqual({
      type: Types.INVESTMENT_DETAILS_ADD_FAILURE,
    })
  })
})
