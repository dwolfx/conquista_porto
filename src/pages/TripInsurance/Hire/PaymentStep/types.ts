export interface ICreditCardForm {
  parcelOption: {
    id: number
    name: string
  }
  cardNumber: string
  name: string
  validity: string
  cvc: string
}
