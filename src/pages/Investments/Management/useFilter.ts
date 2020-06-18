import { useSelector } from 'react-redux'

const useFilter = (filters: string[]) => {
  const fundsList = useSelector((state: any) => state.investmentPosition.data)
  let filteredData = []
  if (fundsList && fundsList.length > 0) {
    filteredData = fundsList
      .map((iP: any) =>
        iP.posicoes.posicao
          .map((pos: any) => pos.fundo)
          .map((fundo: any) => fundo)
      )
      .reduce((flat: any) => flat)
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
