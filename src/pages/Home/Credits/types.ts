import { dict } from 'components/IconExporter'

interface BaseCardInfo {
  type: 'progress' | 'info' | 'error' | 'empty'
  path: string
  title: string
  subtitle?: string
}

export interface FinanceableInfo extends BaseCardInfo {
  totalInstallments?: string
  paidInstallments?: string
}

export interface ConsortiumVehicle extends FinanceableInfo {}
export interface FinanceableVehicle extends FinanceableInfo {}
export interface ConsortiumProperty extends FinanceableInfo {}
export interface CreditCardInfo extends BaseCardInfo {
  flag?: keyof typeof dict
  valor?: string
}
