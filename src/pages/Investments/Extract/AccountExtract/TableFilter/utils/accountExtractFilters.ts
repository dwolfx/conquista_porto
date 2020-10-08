import { IFilter, ITransaction } from '../../types'

const accountExtractFilters = ({
  entry,
  withdraw,
}: IFilter, extracts: ITransaction[]) => {

  let filteredExtracts: ITransaction[] = [...extracts]
  
  if (withdraw && entry) {
    return filteredExtracts
  }

  if (withdraw) {
    filteredExtracts = filteredExtracts.filter(extract => extract.tipo === 'Retirada')
  }

  if (entry) {
    filteredExtracts = filteredExtracts.filter(extract => extract.tipo === 'Entrada')
  }

  return filteredExtracts
}
export default accountExtractFilters
