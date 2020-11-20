import { ICreditCardCreationPayload } from 'pages/CreditCard/Creation/types'

export interface ICardData {
  isOpen: boolean
  handleClose: () => void
  formData: ICreditCardCreationPayload
  setFormData: (formDataObject: any) => void
}

export interface IOptions {
  id: number | string
  name: string
}
