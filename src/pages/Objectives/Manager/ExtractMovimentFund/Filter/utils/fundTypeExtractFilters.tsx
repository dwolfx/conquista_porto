// import { IFilter, ITransaction } from '../../types'
import { IFundExtract } from 'store/modules/ObjectiveManagement/types'

interface IFilter {
  applyFund: boolean
  linkObjective: boolean
  redeemFund: boolean
  delinkObjective: boolean
  transferBetweenObjectives: boolean
}

const fundTypeExtractFilters = (
  filters: IFilter,
  fundExtracts: IFundExtract[]
) => {
  let filteredFundExtracts: IFundExtract[] = []

  if (
    Object.values(filters).every(item => item === true) ||
    Object.values(filters).every(item => item === false)
  ) {
    return (filteredFundExtracts = [...fundExtracts])
  }

  if (filters.applyFund) {
    Array.prototype.push.apply(
      filteredFundExtracts,
      fundExtracts.filter(
        extract => extract.transaction_type === 'Aplicação no fundo'
      )
    )
  }

  if (filters.linkObjective) {
    Array.prototype.push.apply(
      filteredFundExtracts,
      fundExtracts.filter(
        extract => extract.transaction_type === 'Vinculo ao Objetivo'
      )
    )
  }

  if (filters.delinkObjective) {
    Array.prototype.push.apply(
      filteredFundExtracts,
      fundExtracts.filter(
        extract => extract.transaction_type === 'Desvinculo ao Objetivo'
      )
    )
  }

  if (filters.redeemFund) {
    Array.prototype.push.apply(
      filteredFundExtracts,
      fundExtracts.filter(
        extract => extract.transaction_type === 'Resgate do fundo'
      )
    )
  }

  if (filters.transferBetweenObjectives) {
    Array.prototype.push.apply(
      filteredFundExtracts,
      fundExtracts.filter(
        extract => extract.transaction_type === 'Transferência entre objetivos'
      )
    )
  }

  return filteredFundExtracts
}
export default fundTypeExtractFilters
