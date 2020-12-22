import * as tSelect from 'components/Inputs/Select/types'

export interface IDrawerChangePayment {
  isOpen: boolean
  handleClose: () => void
}

export interface ISelectNumberQuota {
  numberQuota: tSelect.TOptions[]
  selected: tSelect.TSelected
  label: string
}

export interface ISelectPayMethod {
  paymentType: tSelect.TOptions[]
  selected: tSelect.TSelected
  label: string
}
