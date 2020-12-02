import AdventureSports from './AdventureSports'
import PassengerStep from './PassengerStep'
import OriginTrip from './OriginTripStep'

export const Steps = {
  originTrip: OriginTrip,
  passengerStep: PassengerStep,
  adventureSports: AdventureSports,
}
export interface IForm {
  // Definir os valores padrões
  counter: string
}
