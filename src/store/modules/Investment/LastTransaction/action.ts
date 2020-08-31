import { Types } from './types'
import ITransaction from './iTransaction'

export function GetLastTransactionDataRequest(fundId: string) {
  return {
    type: Types.LAST_TRANSACTION_GET_DATA_REQUEST,
    fundId: fundId,
  }
}

export function GetLastTransactionDataSuccess(payload: ITransaction[]) {
  return {
    type: Types.LAST_TRANSACTION_GET_DATA_SUCCESS,
    payload,
  }
}

export function GetLastTransactionDataFailure() {
  return {
    type: Types.LAST_TRANSACTION_GET_DATA_FAILURE,
  }
}
