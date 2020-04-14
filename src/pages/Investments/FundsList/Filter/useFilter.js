import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export default function useFilter(filter) {
  const funds = useSelector(state => state.investmentsList.data)

  function filterByCategoriaArena(list, categoriaArena) {
    return list.filter(fund =>
      categoriaArena.includes(fund.categoria_arena.toLowerCase())
    )
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
    return newFundsList
  }, [funds, filter])

  return formattedFundsList
}
