import { objectivesColorGuide } from 'styles/theme'

export const getColorGuide = index =>
  objectivesColorGuide[index % objectivesColorGuide.length]

export const isFundsNotTheSame = (fundList, fundListCopy) => {
  const compare = fundList.map((item, index) => {
    if (item.invested !== fundListCopy[index].invested) {
      return true
    }

    return false
  })

  if (compare.includes(true)) {
    return true
  }

  return false
}
