import { dict } from 'components/IconExporter'
import { Dispatch, SetStateAction } from 'react'
import { TObjectiveFunds } from 'store/modules/ObjectiveManagement/types'

export interface IRedeem {
  fund: TObjectiveFunds
  handleClose: () => void
  isOpen: boolean
}

export type TRedeemOptions = 'unlink' | 'transfer' | 'redeem' | undefined

type TContentValue = {
  objectiveId: number
  value: number
}

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

export interface ITransferContent {
  fundInfo: TObjectiveFunds
  value: TContentValue
  setButtonIsDisabled?: Dispatch<SetStateAction<boolean>>
  setValue: Dispatch<SetStateAction<TContentValue>>
}

export type TRedeemContentOptions = {
  id: string
  label: string
  checked: boolean
  setButtonIsDisabled?: Dispatch<SetStateAction<boolean>>
}

export interface IRedeemContent {
  options: TRedeemContentOptions[]
  setOptions: Dispatch<SetStateAction<TRedeemContentOptions[]>>
}

export interface IState {
  objectiveManagement: {
    isLoadingFundsMovement: boolean
  }
}
