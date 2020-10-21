import { useMemo } from 'react'
import { IFilterProps } from './index'
import {
  FILTER_TYPES,
  FILTER_RISKS,
} from 'pages/Investments/FundsList/constants'
import { IFundsList } from 'store/modules/Investment/types'

const useFilter = (filter: IFilterProps, funds: IFundsList[]) => {
  function filterByCategoriaArena(
    fundsList: IFundsList[],
    categoriaArena: string[]
  ) {
    return fundsList.filter(fund =>
      categoriaArena.includes(fund.categoria_arena.toLowerCase())
    )
  }
  function sortFundsByRisk(fundsList: IFundsList[]) {
    let sortedList = [...fundsList].sort(
      (itemList1: IFundsList, itemList2: IFundsList) => {
        const indexItemList1 = Object.values(FILTER_RISKS).indexOf(
          itemList1.perfil_risco.toLowerCase()
        )
        const indexItemList2 = Object.values(FILTER_RISKS).indexOf(
          itemList2.perfil_risco.toLowerCase()
        )
        if (indexItemList1 > indexItemList2) return 1
        if (indexItemList2 > indexItemList1) return -1
        return 0
      }
    )
    sortedList = sortedList.sort(
      (itemList1: IFundsList, itemList2: IFundsList) => {
        const indexItemList1 = Object.values(FILTER_TYPES).indexOf(
          itemList1.categoria_arena.toLowerCase()
        )
        const indexItemList2 = Object.values(FILTER_TYPES).indexOf(
          itemList2.categoria_arena.toLowerCase()
        )
        if (indexItemList1 > indexItemList2) return 1
        if (indexItemList2 > indexItemList1) return -1
        return 0
      }
    )
    return sortedList
  }
  function filterByPerfilRisco(fundsList: IFundsList[], perfilRisco: string[]) {
    return fundsList.filter(fund =>
      perfilRisco.includes(fund.perfil_risco.toLowerCase())
    )
  }
  const formattedFundsList = useMemo(() => {
    const categoriaArena = filter.byCategoriaArena
    const perfilRisco = filter.byPerfilRisco
    const newFundsList = sortFundsByRisk(funds)
    if (categoriaArena.length > 0 && perfilRisco.length > 0) {
      const filteredListByPerfilRisco = filterByPerfilRisco(
        newFundsList,
        perfilRisco
      )
      return filterByCategoriaArena(filteredListByPerfilRisco, categoriaArena)
    }
    if (categoriaArena.length > 0 && perfilRisco.length === 0) {
      return filterByCategoriaArena(newFundsList, categoriaArena)
    }
    if (perfilRisco.length > 0 && categoriaArena.length === 0) {
      return filterByPerfilRisco(newFundsList, perfilRisco)
    }
    if (perfilRisco.length === 0) {
      return newFundsList
    }
    return newFundsList
  }, [funds, filter])
  return formattedFundsList
}
export default useFilter
