import { useSelector, useDispatch } from 'react-redux'
import { SetIdFund } from 'store/modules/Investment/Position/action'
import { IFund } from 'store/modules/Investment/Position/iPositions'
const useFilter = (filters: string[]) => {
  const dispatch = useDispatch()
  const { fundsList, idFund } = useSelector((state: any) => ({
    fundsList: state.investmentPosition.data,
    idFund: state.investmentPosition.idFund,
  }))
  let filteredData = []
  if (fundsList && fundsList.length > 0) {
    filteredData = fundsList.filter(
      (fundo: IFund) => Number(fundo.saldo_bruto_numerico) !== 0
    )
    if (!idFund) {
      dispatch(SetIdFund(filteredData[0].id))
    }
  }
  if (
    filteredData &&
    filteredData.length > 0 &&
    filters &&
    filters.length > 0
  ) {
    return filteredData.filter((fund: IFund) =>
      filters.includes(fund.categoria_arena.toLowerCase())
    )
  }
  return filteredData
}
export default useFilter
