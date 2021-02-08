export interface IEditHirerData {
  isOpen: boolean
  handleClose: () => void
  // formData: ICreditCardCreationPayload
  // setFormData: (formDataObject: any) => void
}

export interface IDefaultStore {
  customerProfile: {
    data: {
      cpfCnpj: string
      customerName: string
      customerEmail: string
      customerState: string
      customerBirthdate: string
      customerPhoneNumber: string
      customerAreaCode: string
      customerGender: string
    }
    isLoading: boolean
  }
}
