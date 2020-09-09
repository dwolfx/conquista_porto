import { IFunds } from 'store/modules/Objective/types'

export interface IFundsListProps {
  walletFunds: IFunds[]
  setWalletFunds: (funds: IFunds[]) => void
  onClose: () => void
}

export interface IFundSort {
  sortBy: string | null
  sortType: boolean | null
}

export interface IFilterProps {
  byCategoriaArena: string[]
  byPerfilRisco: string[]
}
