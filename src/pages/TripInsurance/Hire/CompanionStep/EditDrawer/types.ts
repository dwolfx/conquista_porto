import { TSelected } from 'components/Inputs/Select/types'

export interface IFormDrawerCompanion {
  name: string
  documentNumber: string
  birthdayDate: Date
  gender: TSelected
  isBrazilianResident: boolean
  hasPoliticallyExposedPerson: boolean
  whoIsPoliticallyExposedPerson?: TSelected
  politicallyExposedPersonName?: string
  politicallyExposedPersonCPF?: string
  isSameContactForEmergencyData: boolean
  emergencyContactName?: string
  emergencyContactPhone?: string
  status: boolean
}
