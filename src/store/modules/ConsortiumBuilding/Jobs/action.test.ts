import { Types } from './types'
import { GetJobsRequest, GetJobsSuccess, GetJobsFailure } from './action'

describe('Consortium Building Jobs Actions', () => {
  test('if GetJobsRequest returns the correct object', () => {
    expect(GetJobsRequest()).toEqual({
      type: Types.GET_JOBS_REQUEST,
    })
  })

  test('if GetJobsSuccess returns the correct object', () => {
    const payload = {}

    expect(GetJobsSuccess(payload)).toEqual({
      type: Types.GET_JOBS_SUCCESS,
      payload,
    })
  })

  test('if GetJobsFailure returns the correct object', () => {
    expect(GetJobsFailure()).toEqual({
      type: Types.GET_JOBS_FAILURE,
    })
  })
})
