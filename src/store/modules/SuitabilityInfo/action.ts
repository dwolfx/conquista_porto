import { Types } from './types'
import { IToast } from 'hooks/toast'

interface ISuitabilityInfo {
  CotistaContaOrdemPortoPar: string
  codigo_status_cotista: string
  id_cotista?: string
  investidor_profissional: string
  investidor_qualificado: string
  status_cotista: boolean
  status_data_vencimento_cadastro: boolean
  status_data_vigencia_suitability: boolean
  status_possui_suitability: boolean
}

export function GetSuitabilityInfoRequest(cpf: string) {
  return {
    type: Types.SUITABILITY_INFO_GET_DATA_REQUEST,
    payload: { cpf },
  }
}

export function GetSuitabilityInfoAndValidate(
  onSuccess: Function,
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
