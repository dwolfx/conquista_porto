import { IContemplatedData } from 'store/modules/ConsortiumBuilding/Contemplated/types'

export interface IContemplatedState {
  contemplated: {
    data: IContemplatedData | null
    isLoading: boolean
    status: string
  }
}
