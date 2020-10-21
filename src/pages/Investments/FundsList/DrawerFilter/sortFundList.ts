import { IFundsList } from 'store/modules/Investment/types'

export interface IFundSort {
  sortBy: string | null
  sortType: boolean | null
}
export default function sortFundList(
  list: Array<IFundsList>,
  sort: IFundSort
): IFundsList[] {
  const { sortType, sortBy } = sort

  const sorteableCotizacaoList = list.map(listItem => {
    /* 
      Extraindo todos os números do campo "resgate_cotizacao" e atribuindo 
      na property cotizacaoIndex para maior precisão na ordenação 
      ex: 
        resgate_cotizacao: "D+45 Dias (Úteis)"
        cotizacaoIndex: 45 
    */
    return {
      ...listItem,
      cotizacaoIndex: +listItem.resgate_cotizacao.replace(/\D/gm, ''),
    }
  })

  if (sortBy && sortType !== null) {
    // Separa valores inválidos que impactam na ordenação
    const invalidValues = sorteableCotizacaoList.filter(
      (listItem: IFundsList) => listItem[sortBy as keyof IFundsList] === '-'
    )
    const sorteableValues = sorteableCotizacaoList.filter(
      listItem => listItem[sortBy as keyof IFundsList] !== '-'
    )

    const sortedList = [
      ...[...sorteableValues].sort(
        (fund1, fund2) =>
          (fund2[sortBy as keyof IFundsList] as any) -
          (fund1[sortBy as keyof IFundsList] as any)
      ),
      ...invalidValues,
    ]
    return sortType ? sortedList : sortedList.reverse() // Crescente : Decrescente
  } else {
    return list
  }
}
