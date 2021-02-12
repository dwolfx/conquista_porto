import { combineReducers } from 'redux'

import alignmentTerms from './Investment/FinancialApplication/AlignmentTerms/reducer'
import bankData from './BankData/reducer'
import bankExtract from './BankExtract/reducer'
import bankExtractFund from './BankExtractFund/reducer'
import creditCard from './CreditCard/reducer'
import creditCardExpirationDays from './CreditCard/ExpirationDays/reducer'
import creditCardOccupation from './CreditCard/Occupation/reducer'
import creditCardOffer from './CreditCard/Offers/reducer'
import consolidatedPosition from './ConsolidatedPosition/reducer'
import consortiumBuilding from './ConsortiumBuilding/reducer'
import consortiumBuildingStates from './ConsortiumBuilding/States/reducer'
import consortiumBuildingProposalSimulations from './ConsortiumBuilding/ProposalSimulations/reducer'
import consortiumVehicle from './ConsortiumVehicle/reducer'
import customerProfile from './CustomerProfile/reducer'
import destinationCountries from './TripInsurance/DestinationCountries/reducer'
import {
  financialApplicationGetData,
  financialApplicationPostData,
} from './Investment/FinancialApplication/reducer'
import investmentsList from './Investment/reducer'
import investmentDetails from './Investment/Details/reducer'
import investmentPosition from './Investment/Position/reducer'
import comparativeProfitability from './Investment/ComparativeProfitability/reducer'
import income from './Investment/Income/reducer'
import vehicleFinancing from './VehicleFinancing/reducer'
import lifeInsurance from './LifeInsurance/reducer'
import tripInsurance from './TripInsurance/reducer'
import tripInsuranceCreditCard from './TripInsurance/CreditCard/reducer'
import tripInsuranceProposal from './TripInsurance/Proposal/reducer'
import tripInsuranceQuotation from './TripInsurance/InsuranceQuotation/reducer'
import fluxManagement from './FluxManagement/reducer'
import points from './Points/reducer'
import privateWelfare from './PrivateWelfare/reducer'
import notifications from './Notifications/reducer'
import auth from './Auth/reducer'
import objective from './Objective/reducer'
import objectiveManagement from './ObjectiveManagement/reducer'
import suitability from './Suitability/reducer'
import suitabilityInfo from './SuitabilityInfo/reducer'
import redeemData from './Investment/Redeem/reducer'
import redeemSummaryData from './Investment/Redeem/SummaryRedeem/reducer'
import redeemAlignmentTerms from './Investment/Redeem/AlignmentTerms/reducer'
import rewardsRecommendations from './Rewards/Recommendations/reducer'
import rewardsTypes from './Rewards/Types/reducer'
import virtualKeyboard from './VirtualKeyboard/reducer'
import token2fa from './2FAToken/reducer'
import lastTransaction from './Investment/LastTransaction/reducer'
import withdraw from './Withdraw/reducer'
import zipCode from './ZipCode/reducer'
import contemplated from './ConsortiumBuilding/Contemplated/reducer'

export default combineReducers({
  alignmentTerms,
  bankData,
  bankExtract,
  bankExtractFund,
  consortiumBuilding,
  consortiumBuildingStates,
  consortiumBuildingProposalSimulations,
  consortiumVehicle,
  creditCard,
  creditCardExpirationDays,
  creditCardOccupation,
  creditCardOffer,
  customerProfile,
  destinationCountries,
  financialApplicationGetData,
  financialApplicationPostData,
  fluxManagement,
  investmentsList,
  investmentDetails,
  investmentPosition,
  comparativeProfitability,
  income,
  lifeInsurance,
  consolidatedPosition,
  vehicleFinancing,
  tripInsurance,
  tripInsuranceCreditCard,
  tripInsuranceProposal,
  tripInsuranceQuotation,
  notifications,
  points,
  privateWelfare,
  auth,
  objective,
  objectiveManagement,
  suitability,
  suitabilityInfo,
  redeemData,
  redeemSummaryData,
  redeemAlignmentTerms,
  rewardsRecommendations,
  rewardsTypes,
  virtualKeyboard,
  token2fa,
  lastTransaction,
  withdraw,
  zipCode,
  contemplated,
})
