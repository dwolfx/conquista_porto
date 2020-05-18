import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { IFilterProps } from './index'

import {
  FILTER_TYPES,
  FILTER_RISKS,
} from 'pages/Investments/FundsList/constants'

export interface IFund {
  apelido: string
  aplicao_liberada: boolean
  categoria_arena: string
  id_fundo: string
  perfil_risco: 'baixo' | 'medio-baixo' | 'medio' | 'medio-alto' | 'alto'
  minimo_inicial: number
  resgate_cotizacao: string
  rentabil_fundo_mes: number
  rentabil_fundo_12_meses: number
  rentabil_fundo_ano: number
  taxa_administracao: number
}

const useFilter = (filter: IFilterProps) => {
  const funds: IFund[] = useSelector((state: any) =>
    state.investmentsList.data
      .flatMap((item: any) => item)
      .reduce((prev: any, curr: any) => [...prev, ...curr.fundos], [])
  )

  function filterByCategoriaArena(
    fundsList: IFund[],
    categoriaArena: string[]
  ) {
    return fundsList.filter(fund =>
      categoriaArena.includes(fund.categoria_arena.toLowerCase())
    )
  }

  function sortFundsByRisk(fundsList: IFund[]) {
    let sortedList = fundsList.sort((itemList1: IFund, itemList2: IFund) => {
      const indexItemList1 = Object.values(FILTER_RISKS).indexOf(
        itemList1.perfil_risco.toLowerCase()
      )
      const indexItemList2 = Object.values(FILTER_RISKS).indexOf(
        itemList2.perfil_risco.toLowerCase()
      )

      if (indexItemList1 > indexItemList2) return 1
      if (indexItemList2 > indexItemList1) return -1

      return 0
    })

    sortedList = sortedList.sort((itemList1: IFund, itemList2: IFund) => {
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

    return sortedList
  }

  function filterByPerfilRisco(fundsList: IFund[], perfilRisco: string[]) {
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
