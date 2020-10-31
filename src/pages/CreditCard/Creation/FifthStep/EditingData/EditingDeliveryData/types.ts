import { ICreditCardCreationPayload } from 'pages/CreditCard/Creation/types'

export interface IEditingDeliveryData {
  isOpen: boolean
  handleClose: () => void
  formData: ICreditCardCreationPayload
  setFormData: (formDataObject: any) => void
}
