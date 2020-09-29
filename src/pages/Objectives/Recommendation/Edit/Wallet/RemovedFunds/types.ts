import { IFunds } from 'store/modules/Objective/types'

export type TRemoved = IFunds[] | []

export interface IRemovedProps {
  removedFunds: TRemoved
  restoreFunds: (selectedIds: number[]) => void
  isOpen: boolean
  setIsOpen: (openState: boolean) => void
}
