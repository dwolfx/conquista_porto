import { IFunds } from 'store/modules/Objective/types'

export interface IMobileProps {
  funds: IFunds[]
  onChangeAction: (props: any) => void
  removeAction: (id: number) => void
}
