import { Types } from './types'
import { IToast } from 'hooks/toast'

export function GetPointsExtractRequest(cpf: string) {
  return {
    type: Types.GET_EXTRACT_REQUEST,
    cpf,
  }
}

export function GetPointsExtractSuccess(payload: any) {
  return {
    type: Types.GET_EXTRACT_SUCCESS,
    payload,
  }
}

export function GetPointsExtractFailure() {
  return {
    type: Types.GET_EXTRACT_FAILURE,
  }
}

export function GetPointsBalanceRequest(cpf: string) {
  return {
    type: Types.GET_BALANCE_REQUEST,
    cpf,
  }
}

export function GetPointsBalanceSuccess(payload: any) {
  return {
    type: Types.GET_BALANCE_SUCCESS,
    payload,
  }
}

export function GetPointsBalanceFailure() {
  return {
    type: Types.GET_BALANCE_FAILURE,
  }
}

export function PostRecuePointsRequest({
  onSuccess,
  onErrorToast,
}: {
  onSuccess: (url: string) => void
  onErrorToast: (toast: Omit<IToast, 'id'>) => void
}) {
  return {
    type: Types.POST_RESCUE_POINTS_REQUEST,
    payload: { onSuccess, onErrorToast },
  }
}
