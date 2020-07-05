import { useSelector, useDispatch } from 'react-redux'
import { SetIdFund } from 'store/modules/Investment/Position_old/action'

const useFilter = (filters: string[]) => {
  const dispatch = useDispatch()
  const { fundsList, idFund } = useSelector((state: any) => ({
    fundsList: state.investmentPosition.data,
    idFund: state.investmentPosition.idFund,
  }))
  let filteredData = []
  if (fundsList && fundsList.length > 0) {
    filteredData = fundsList
      .map((iP: any) =>
        iP.posicoes.posicao
          .map((pos: any) => ({ saldo_atual: pos.saldo_atual, ...pos.fundo }))
          .map((fundo: any) => fundo)
      )
      .reduce((flat: any) => flat)
    if (!idFund) {
      dispatch(SetIdFund(filteredData[0].id_carteira))
    }
  }
  if (
    filteredData &&
    filteredData.length > 0 &&
    filters &&
    filters.length > 0
  ) {
    return filteredData.filter((fund: any) =>
      filters.includes(fund.categoria_arena.toLowerCase())
    )
  }
  return filteredData
}

export default useFilter
