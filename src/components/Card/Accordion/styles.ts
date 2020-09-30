import styled from 'styled-components'

import CardCmp from 'components/Card'
import { CardHeader, CardBody } from 'components/Card/styles'

interface ICard {
  height: string
  isExpanded: boolean
}

export const Card = styled(CardCmp)<ICard>`
  position: relative;

  ${CardHeader} {
    border-bottom: ${({ isExpanded, height, theme }) =>
      !isExpanded && height === '0px'
        ? 'none'
        : `1px solid ${theme.colors.gray3}`};
  }
  ${CardBody} {
    height: ${({ height }) => height};
    flex: ${({ isExpanded, height }) => (!isExpanded ? 'auto' : 1)};
  }
`
