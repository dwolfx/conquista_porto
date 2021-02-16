import { Types, IJobsConsortiumBuilding } from './types'

export function GetJobsRequest() {
  return {
    type: Types.GET_JOBS_REQUEST,
  }
}

export function GetJobsSuccess(payload: IJobsConsortiumBuilding) {
  return {
    type: Types.GET_JOBS_SUCCESS,
    payload,
  }
}

export function GetJobsFailure() {
  return {
    type: Types.GET_JOBS_FAILURE,
  }
}
