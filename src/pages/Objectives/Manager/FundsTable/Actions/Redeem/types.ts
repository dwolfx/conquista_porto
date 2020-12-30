import { dict } from 'components/IconExporter'
import { Dispatch, SetStateAction } from 'react'
import { IObjectiveList } from 'store/modules/Objective/types'
import {
  IObjectManagement,
  TObjectiveFunds,
} from 'store/modules/ObjectiveManagement/types'

export interface IRedeem {
  fund: TObjectiveFunds
  handleClose: () => void
  isOpen: boolean
}

export type TRedeemOptions = 'unlink' | 'transfer' | 'redeem' | undefined

export type TError =
  | {
      icon: keyof typeof dict
      message: string
    }
  | undefined

export interface IUnlinkContent {
  fundInfo: TObjectiveFunds
  value: number
  setButtonIsDisabled: Dispatch<SetStateAction<boolean>>
  setValue: Dispatch<SetStateAction<number>>
}

export type TTransferObject = {
  name?: string
  id?: number
  value?: number
}

export interface ITransferContent {
  fundInfo: TObjectiveFunds
  value: TTransferObject
  setButtonIsDisabled: Dispatch<SetStateAction<boolean>>
  setValue: Dispatch<SetStateAction<TTransferObject>>
}

export type TRedeemContentQuestions = {
  id: string
  text: string
  checked?: boolean
}

export interface IRedeemContent {
  questions: TRedeemContentQuestions[]
  setQuestions: Dispatch<SetStateAction<TRedeemContentQuestions[]>>
  setButtonIsDisabled: Dispatch<SetStateAction<boolean>>
}

export interface IState {
  objectiveManagement: {
    isLoadingFundsMovement: boolean
    isLoadingTransfer: boolean
    data: IObjectManagement
  }
  objective: {
    objectives: IObjectiveList[]
    isLoadingList: boolean
  }
  suitabilityInfo: {
    isLoading: boolean
  }
  redeemData: {
    isLoading: boolean
  }
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
