import { useSelector, useDispatch } from 'react-redux'
import { SetIdFund } from 'store/modules/Investment/Position/action'

const useFilter = (filters: string[]) => {
  const dispatch = useDispatch()
  const { fundsList, idFund } = useSelector((state: any) => ({
    fundsList: state.investmentPosition.data,
    idFund: state.investmentPosition.idFund,
  }))

  let filteredList = []

  if (fundsList && fundsList.length > 0) {
    if (!idFund) dispatch(SetIdFund(fundsList[0].id))

    if (filters && filters.length > 0) {
      filteredList = fundsList.filter((fund: any) =>
        filters.includes(fund.categoria.toLowerCase())
      )
    } else {
      filteredList = fundsList
    }
  }
  return filteredList
}

export default useFilter
