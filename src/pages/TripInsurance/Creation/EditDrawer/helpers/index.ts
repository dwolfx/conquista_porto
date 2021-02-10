import { calculateAge } from 'helpers'
import moment from 'moment'

export const totalPassengerBelowSeventyYears = (
  passengerBelowSeventh: number,
  mainPassenger: string | undefined,
  allCompanions: number,
  passengerAboveSeventh: number
) => {
  const age = calculateAge(moment(mainPassenger).format('DD/MM/YYYY'))
  return {
    id:
      age <= 70 &&
      passengerBelowSeventh + passengerAboveSeventh <= allCompanions &&
      passengerBelowSeventh !== 0
        ? (passengerBelowSeventh + 1).toString()
        : passengerBelowSeventh.toString(),
    name:
      age <= 70 &&
      passengerBelowSeventh + passengerAboveSeventh <= allCompanions &&
      passengerBelowSeventh !== 0
        ? (passengerBelowSeventh + 1).toString()
        : passengerBelowSeventh.toString(),
    value:
      age <= 70 &&
      passengerBelowSeventh + passengerAboveSeventh <= allCompanions &&
      passengerBelowSeventh !== 0
        ? passengerBelowSeventh + 1
        : passengerBelowSeventh,
  }
}

export const totalPassengerAboveSeventyYears = (
  passengerAboveSeventh: number,
  mainPassenger: string | undefined,
  allCompanions: number,
  passengerBelowSeventh: number
) => {
  const age = calculateAge(moment(mainPassenger).format('DD/MM/YYYY'))
  return {
    id:
      age > 70 &&
      passengerBelowSeventh + passengerAboveSeventh <= allCompanions &&
      passengerAboveSeventh !== 0
        ? (passengerAboveSeventh + 1).toString()
        : passengerAboveSeventh.toString(),
    name:
      age > 70 &&
      passengerBelowSeventh + passengerAboveSeventh <= allCompanions &&
      passengerAboveSeventh !== 0
        ? (passengerAboveSeventh + 1).toString()
        : passengerAboveSeventh.toString(),
    value:
      age > 70 &&
      passengerBelowSeventh + passengerAboveSeventh <= allCompanions &&
      passengerAboveSeventh !== 0
        ? passengerAboveSeventh + 1
        : passengerAboveSeventh,
  }
}
