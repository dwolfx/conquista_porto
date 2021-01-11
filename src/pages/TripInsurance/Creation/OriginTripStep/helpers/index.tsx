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
