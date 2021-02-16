import * as t from 'store/modules/ConsortiumBuilding/States/types'
export interface ISelected {
  id: number
  name: string
}

export interface IState {
  sigla: string
  nome: string
}

export interface IConsortiumBuildingStates {
  consortiumBuildingStates: {
    data: t.IPayload
    isLoading: boolean
    hasError: boolean
  }
}

export interface IDefaultStore {
  consortiumBuildingStates: {
    data: t.IPayload
    isLoading: boolean
    hasError: boolean
  }
}
