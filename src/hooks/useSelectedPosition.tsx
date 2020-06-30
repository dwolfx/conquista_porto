import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useSelectedPosition = () => {
  const [position, setPosition] = useState<any>(null)

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
    } else {
      setPosition(null)
    }
  }, [investmentPosition])

  return position
}

export default useSelectedPosition
