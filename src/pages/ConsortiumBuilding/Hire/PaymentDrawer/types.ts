export interface IChangePaymentData {
  isOpen: boolean
  handleClose: () => void
}

export interface IOptionWrapper {
  border?: boolean
  paymentMethodIsSelected?: boolean
  height?: number
  noPadding?: boolean
}

export interface ITextWrapper {
  marginLeft?: boolean
}

export interface IHeadlineText {
  marginTop?: boolean
}
