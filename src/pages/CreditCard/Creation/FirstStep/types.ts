export interface ICustomerData {
  label: string
  value: string
}

export interface IFirstStep {
  onNextStep: (step: 1 | 2 | 3 | 4 | 5) => void
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
