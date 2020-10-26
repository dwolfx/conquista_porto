export interface IEditingDeliveryData {
  isOpen: boolean
  handleClose: () => void
  formData: any
  setFormData: (formDataObject: any) => void
}
