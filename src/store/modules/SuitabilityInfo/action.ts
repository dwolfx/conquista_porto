import { Types, ISuitabilityInfo } from './types'
import { IToast } from 'hooks/toast'

export function GetSuitabilityInfoRequest() {
  return {
    type: Types.SUITABILITY_INFO_GET_DATA_REQUEST,
  }
}

export function GetSuitabilityInfoAndValidate(
  onSuccess: null | Function,
  buttonType: 'investir' | 'retirar' | 'resgatar',
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
) {
  return {
    type: Types.SUITABILITY_INFO_GET_DATA_REQUEST_VALIDATE,
    payload: { onSuccess, buttonType, onErrorToast },
  }
}

export function GetDataSuccess(payload: ISuitabilityInfo) {
  return {
    type: Types.SUITABILITY_INFO_GET_DATA_SUCCESS,
    payload,
  }
}

export function GetDataFailure() {
  return {
    type: Types.SUITABILITY_INFO_GET_DATA_FAILURE,
  }
}
