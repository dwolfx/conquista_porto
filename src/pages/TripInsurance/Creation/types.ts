import AdventureSports from './AdventureSports'
import PassengerStep from './PassengerStep'
import OriginTrip from './OriginTripStep'
import CoverageDate from './CoverageDate'
import MotocicleQuestion from './MotocicleQuestion'
import ChoosePlan from './ChoosePlan'
import Status from '../commons/RequestProposalStatus'
import InformationConfirmation from '../Hire/InformationConfirmation'

export const Steps = {
  status: Status,
  originTrip: OriginTrip,
  coverageDate: CoverageDate,
  passengerStep: PassengerStep,
  adventureSports: AdventureSports,
  motocicleQuestion: MotocicleQuestion,
  choosePlan: ChoosePlan,
  informationConfirmation: InformationConfirmation,
}
export interface IForm {
  // Definir os valores padrões
  counter: string
}
