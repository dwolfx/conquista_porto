import { useSelector } from 'react-redux'
import { ISelectedExtractFundFilter } from './types'

// const useFilterExtract = (filters: ISelectedExtractFundFilter) => {
const useFilterExtract = () => {
  const { bankExtractFund } = useSelector((state: any) => ({
    bankExtractFund: state.bankExtract.data,
  }))
  let filteredData = []
  if (
    bankExtractFund &&
    bankExtractFund.transacoes &&
    bankExtractFund.transacoes.transacao
  ) {
    filteredData = bankExtractFund.transacoes.transacao
  }
  console.log(filteredData)
  return filteredData
}

export default useFilterExtract
