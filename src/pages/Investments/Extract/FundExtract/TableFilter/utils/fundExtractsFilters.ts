import { IFundExtractFilter, ITransaction } from '../../types'

const fundExtractsFilters = (
  { apply, others, quotaEater, redeem }: IFundExtractFilter,
  extracts: ITransaction[]
) => {
  const extractsCopy: ITransaction[] = [...extracts]
  let filteredExtracts: ITransaction[] = []

  if (!apply && !redeem && !quotaEater && !others) {
    return extractsCopy
  }

  if (apply) {
    filteredExtracts = [
      ...filteredExtracts,
      ...extractsCopy.filter(extract => extract.tipo === 'APLICAÇÃO'),
    ]
  }

  if (redeem) {
    filteredExtracts = [
      ...filteredExtracts,
      ...extracts.filter(extract => extract.tipo === 'RESGATE'),
    ]
  }

  if (quotaEater) {
    filteredExtracts = [
      ...filteredExtracts,
      ...extracts.filter(extract => extract.tipo === 'COME-COTAS'),
    ]
  }

  if (others) {
    filteredExtracts = [
      ...filteredExtracts,
      ...extracts.filter(extract => extract.tipo === 'OUTROS'),
    ]
  }

  return filteredExtracts
}
export default fundExtractsFilters
