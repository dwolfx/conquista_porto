import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useSelectedPosition = () => {
  const [position, setPosition] = useState<any | null>(null)

  const { investmentPosition } = useSelector(({ investmentPosition }: any) => ({
    investmentPosition,
  }))

  useEffect(() => {
    const chosenInvestmentFund = () =>
      investmentPosition.data[0].posicoes.posicao.find(
        (posicao: any) =>
          posicao.fundo.id_carteira === investmentPosition.idFund
      )

    if (
      investmentPosition.idFund &&
      investmentPosition.data &&
      investmentPosition.data.length !== 0
    ) {
      setPosition(chosenInvestmentFund())
    } else if (!investmentPosition.idFund) {
      setPosition(null)
    } else {
      setPosition({
        isLoading: investmentPosition.isLoading,
        hasError: investmentPosition.hasError,
      })
    }
  }, [investmentPosition])

  return position
}

export default useSelectedPosition
