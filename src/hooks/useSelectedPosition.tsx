import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const useSelectedPosition = () => {
  const [position, setPosition] = useState<any>(null)

  const { investmentPosition } = useSelector<any, any>(state => ({
    investmentPosition: state.investmentPosition,
  }))

  useEffect(() => {
    const chosenInvestmentFund = () =>
      investmentPosition.data.find(
        (fundo: any) => fundo.id === investmentPosition.idFund
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
