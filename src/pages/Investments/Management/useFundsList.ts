import { useSelector } from 'react-redux'

const useFundsList = () => {
  const { fundsList } = useSelector((state: any) => ({
    fundsList: state.investmentPosition.data,
  }))
  let normalizedFundsList = []
  if (fundsList && fundsList.length > 0) {
    normalizedFundsList = fundsList
      .map((iP: any) =>
        iP.posicoes.posicao
          .map((pos: any) => ({
            saldo_atual: pos.saldo_atual,
            ...pos.fundo,
          }))
          .filter((fundo: any) => Number(fundo.saldo_atual) !== 0)
      )
      .reduce((flat: any) => flat)
  }
  return normalizedFundsList
}

export default useFundsList
