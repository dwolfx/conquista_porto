export interface ICardData {
  isOpen: boolean
  handleClose: () => void
  formData: any
  setFormData: (formDataObject: any) => void
}

export interface IOptions {
  id: number
  name: '' | 'Visa' | 'Mastercard'
}
