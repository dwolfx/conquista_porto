import { IFunds } from 'store/modules/Objective/types'

export interface IFundsListProps {
  walletFunds: IFunds[]
  setWalletFunds: (funds: IFunds[]) => void
  onClose: () => void
}

export interface IFilter {
  byCategoriaArena: any[]
  byPerfilRisco: any[]
}
