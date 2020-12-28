import * as t from 'store/modules/TripInsurance/DestinationCountries/types'

export interface ISelected {
  name: string
  id: number
}

export interface IDefaultStore {
  destinationCountries: {
    data: t.IPayload
    isLoading: boolean
    hasError: boolean
  }
}
