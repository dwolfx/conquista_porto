import { IFilter, ITransaction } from '../../types'

const amountToBeSettledFilters = (
  { application, redeem }: IFilter,
  extracts: ITransaction[]
) => {
  let filteredExtracts: ITransaction[] = [...extracts]

  if (redeem && application) {
    return filteredExtracts
  }

  if (redeem) {
    filteredExtracts = filteredExtracts.filter(
      extract => extract.tipo === 'Resgate'
    )
  }

  if (application) {
    filteredExtracts = filteredExtracts.filter(
      extract => extract.tipo === 'Aplicação'
    )
  }

  return filteredExtracts
}

export default amountToBeSettledFilters
