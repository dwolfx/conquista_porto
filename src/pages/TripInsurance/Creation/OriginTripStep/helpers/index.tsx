import { IOption } from 'components/MultiSelector/types'
import { LatinAmericaCountries } from '../types'

export const hasLatinAmerica = (selectedDestinationCountries: IOption[]) => {
  let foundLatinAmericaCountry = false
  selectedDestinationCountries.forEach(selectedCountry => {
    if (
      LatinAmericaCountries.some(
        latinAmericaCountry =>
          +latinAmericaCountry.codigo === selectedCountry.id
      )
    ) {
      foundLatinAmericaCountry = true
    }
  })
  return foundLatinAmericaCountry
}

export const hasOnlyLatinAmerica = (
  selectedDestinationCountries: IOption[]
) => {
  let count = 0

  if (!hasLatinAmerica(selectedDestinationCountries)) {
    return false
  }
  selectedDestinationCountries.forEach(selectedCountry => {
    if (
      LatinAmericaCountries.some(
        latinAmericaCountry =>
          +latinAmericaCountry.codigo === selectedCountry.id
      )
    ) {
      count++
    }
  })
  return (
    selectedDestinationCountries.length > 0 &&
    selectedDestinationCountries.length === count
  )
}
