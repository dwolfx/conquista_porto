import { objectivesColorGuide } from 'styles/theme'

export const getColorGuide = index =>
  objectivesColorGuide[index % objectivesColorGuide.length]

export const isFundsNotTheSame = (fundList, fundListCopy) => {
  const compare = fundList.map((item, index) => {
    if (fundListCopy[index] && item.invested !== fundListCopy[index].invested) {
      return true
    }

    return false
  })

  if (compare.includes(true)) {
    return true
  }

  return false
}

export const handleValueFund = (id, value, fundListCopy, setFundListCopy) => {
  if (setFundListCopy) {
    setFundListCopy(
      fundListCopy.map(item => {
        if (item.id === id) {
          return {
            ...item,
            invested: value,
          }
        }
        return item
      })
    )
  }
}
