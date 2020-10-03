import { Dispatch, SetStateAction } from 'react'

export interface IRedeem {
  fundNickname: string
  fundCategory: string
  handleClose: () => void
  isOpen: boolean
}

export type TRedeemOptions = 'unlink' | 'transfer' | 'redeem' | undefined

type TContentValue = {
  value: number
  objectiveId: number
}

export interface IUnlinkContent {
  value: Pick<TContentValue, 'value'>
  setValue: Dispatch<SetStateAction<Pick<TContentValue, 'value'>>>
}

export interface ITransferContent {
  value: TContentValue
  setValue: Dispatch<SetStateAction<TContentValue>>
}

export type TRedeemContentOptions = {
  id: string
  label: string
  checked: boolean
}

export interface IRedeemContent {
  options: TRedeemContentOptions[]
  setOptions: Dispatch<SetStateAction<TRedeemContentOptions[]>>
}
