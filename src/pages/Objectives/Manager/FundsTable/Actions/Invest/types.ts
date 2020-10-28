import { IFundsList } from 'store/modules/Investment/types'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'
import { ISuitabilityInfo } from 'store/modules/SuitabilityInfo/types'

export interface IProps {
  isOpen: boolean
  handleClose: () => void
  fund: TObjectiveFunds
}

export type TSuitabilityData = {
  isOpen?: boolean
  title?: string
  description?: string
  button?: {
    buttonName: string
    dataGtmName: string
    dataGtmType: string
    dataGtmClicktype: string
    handleClick: () => void
  }
  isValid: boolean
}

export interface IState {
  suitabilityInfo: {
    data: ISuitabilityInfo & TSuitabilityData
    isLoading: boolean
    hasError: boolean
  }
  investmentsList: {
    data: IFundsList[]
    isLoading: boolean
    isError: boolean
  }
  financialApplicationGetData: {
    isLoading: boolean
    hasError: boolean
  }
}
