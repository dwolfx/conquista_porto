export interface IPersonalFormData {
  email: string
  CPF: string
  birthDate: string
  phone: string
  documentType: string
  documentNumber: string
  effectiveDate: string
  issuingBody: string
  expiryDate?: string
  city: string
  civilStatus: string
  gender: string
  profession: string
  motherName: string
}
export interface IEditingPersonalData {
  isOpen: boolean
  handleClose: () => void
  formData: any
  setFormData: (formDataObject: any) => void
}

export interface ICustomerData {
  label: string
  value: string
}

export interface ICustomerProfile {
  customerProfile: {
    data: {
      customerEmail: string
      cpfCnpj: string
      customerBirthdate: string
      customerAreaCode: string
      customerPhoneNumber: string
    }
  }
}

export interface IOption {
  id: number
  name: string
}

export interface IDocumentTypeSelect {
  selectedOption: string
  setSelectedOption: (document: string) => void
}
