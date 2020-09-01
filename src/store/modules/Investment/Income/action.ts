import { Types } from './types'
import IIncomes from './iIncomes'

export function GetIncomesDataRequest(fundId: number) {
  return {
    type: Types.INCOME_GET_DATA_REQUEST,
    fundId,
  }
}

export function GetIncomesDataSuccess(payload: IIncomes[]) {
  return {
    type: Types.INCOME_GET_DATA_SUCCESS,
    payload,
  }
}

export function GetIncomesDataFailure() {
  return {
    type: Types.INCOME_GET_DATA_FAILURE,
  }
}
