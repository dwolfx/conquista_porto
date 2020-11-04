import { ICreditCardCreationPayload } from 'pages/CreditCard/Creation/types'
import { ICreditCardClientData } from 'store/modules/CreditCard/types'
import { Occupation } from 'store/modules/CreditCard/Occupation/types'

export interface IEditingPersonalData {
  isOpen: boolean
  handleClose: () => void
  formData: ICreditCardCreationPayload
  setFormData: (formDataObject: ICreditCardCreationPayload) => void
}

export interface ICustomerData {
  label: string
  value: string
}

export interface IDefaultStore {
  creditCard: {
    clientData: ICreditCardClientData
    isClientDataLoading: false
  }
  creditCardOccupation: {
    data: {
      profissoesVO: Occupation[]
    }
  }
}

export interface IOption {
  id: number | string
  name: string
}

export interface IDocumentTypeSelect {
  selectedOption: string
  setSelectedOption: (document: string) => void
}
