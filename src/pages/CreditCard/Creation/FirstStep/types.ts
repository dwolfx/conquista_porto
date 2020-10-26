export interface ICustomerData {
  label: string
  value: string
}

export interface IFirstStep {
  onNextStep: () => void
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
