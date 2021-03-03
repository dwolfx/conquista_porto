export interface ICustomerProfileState {
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
  status: string
  isLoading: boolean
  hasError: boolean
}

export interface ICardInterface {
  setHasEmptyData: React.Dispatch<React.SetStateAction<boolean>>
}
