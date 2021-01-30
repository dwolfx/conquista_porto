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

export const hasLatinAmericaCountryAndOtherCountry = (
  selectedDestinationCountries: IOption[]
) => {
  let latinAmericaCountry = 0
  selectedDestinationCountries.forEach(selectedCountry => {
    latinAmericaCountry += LatinAmericaCountries.filter(
      latinAmericaCountry => +latinAmericaCountry.codigo === selectedCountry.id
    ).length
  })
  return (
    latinAmericaCountry > 0 &&
    selectedDestinationCountries.length !== latinAmericaCountry
  )
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

// recebe parâmetros do formulário 'destinationCountryCode, additionalCountries'
export const hasOnlyLatinAmericaDestination = (
  destinationCountryCode: string | undefined,
  additionalCountries:
    | {
        codigo: string
        descricao: string
      }[]
    | undefined
) => {
  const formattedCountries: IOption[] = []

  if (destinationCountryCode) {
    formattedCountries.push({
      id: +destinationCountryCode,
      text: '',
      value: '',
    })
  }

  if (additionalCountries) {
    additionalCountries.forEach(country =>
      formattedCountries.push({
        id: +country.codigo,
        text: country.descricao,
        value: country.descricao,
      })
    )
  }

  return hasOnlyLatinAmerica(formattedCountries)
}
