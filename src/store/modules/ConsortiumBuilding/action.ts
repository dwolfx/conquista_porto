import { Types } from './types'
import { IConsortiumItem } from './iConsortiumBuilding'

export function GetConsortiumBuildingDataRequest(cpf: string) {
  return {
    type: Types.GET_REQUEST,
    cpf,
  }
}

export function GetConsortiumBuildingDataSuccess(payload: IConsortiumItem[]) {
  return {
    type: Types.GET_SUCCESS,
    payload,
  }
}

export function GetConsortiumBuildingDataFailure() {
  return {
    type: Types.GET_FAILURE,
  }
}
