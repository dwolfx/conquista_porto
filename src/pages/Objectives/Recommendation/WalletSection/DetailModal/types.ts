import { IFunds } from 'store/modules/Objective/types'

export interface IDetailModalProps {
  fundDetails: IFunds
  isOpen: boolean
  handleClose: () => void
}
