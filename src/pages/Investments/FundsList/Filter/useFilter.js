import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { FILTER_TYPES } from './index'

export default function useFilter(filter) {
  const funds = useSelector(state => state.investmentsList.data)

  function filterByCategoriaArena(list, categoriaArena) {
    return list.filter(fund =>
      categoriaArena.includes(fund.categoria_arena.toLowerCase())
    )
  }

  function sortFunds(list) {
    return list.sort((itemList1, itemList2) => {
      const indexItemList1 = Object.values(FILTER_TYPES).indexOf(
        itemList1.categoria_arena.toLowerCase()
      )
      const indexItemList2 = Object.values(FILTER_TYPES).indexOf(
        itemList2.categoria_arena.toLowerCase()
      )

      if (indexItemList1 > indexItemList2) return 1
      if (indexItemList2 > indexItemList1) return -1

      return 0
    })
  }

  function filterByPerfilRisco(list, perfilRisco) {
    return list.filter(fund => fund.perfil_risco.toLowerCase() === perfilRisco)
  }

  const formattedFundsList = useMemo(() => {
    const categoriaArena = filter.byCategoriaArena
    const perfilRisco = filter.byPerfilRisco
    const newFundsList = funds
      .flatMap(item => item)
      .reduce((prev, curr) => [...prev, ...curr.fundos], [])

    if (categoriaArena.length > 0 && perfilRisco) {
      const filteredListByPerfilRisco = filterByPerfilRisco(
        newFundsList,
        perfilRisco
      )
      return filterByCategoriaArena(filteredListByPerfilRisco, categoriaArena)
    }
    if (categoriaArena.length > 0 && !perfilRisco) {
      return filterByCategoriaArena(newFundsList, categoriaArena)
    }
    if (perfilRisco && categoriaArena.length === 0) {
      return filterByPerfilRisco(newFundsList, perfilRisco)
    }
    return sortFunds(newFundsList)
  }, [funds, filter])

  return formattedFundsList
}
