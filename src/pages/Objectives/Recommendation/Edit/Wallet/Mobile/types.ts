import { IFunds } from 'store/modules/Objective/types'

export interface IMobileProps {
  funds: IFunds[]
  onBlurAction: (props: any) => void
  removeAction: (id: number) => void
}

export interface IEditCards {
  fund: IFunds
  onBlurAction: (props: any) => void
  removeAction: (id: number) => void
}
