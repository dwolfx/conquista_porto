import styled from 'styled-components'

import CardCmp from 'components/Card'
import { CardHeader, CardBody } from 'components/Card/styles'

interface ICard {
  maxHeight: string
  isExpanded: boolean
}

export const Card = styled(CardCmp)<ICard>`
  position: relative;

  ${CardHeader} {
    border-bottom: ${({ isExpanded, maxHeight, theme }) =>
      !isExpanded && maxHeight === '0px'
        ? 'none'
        : `1px solid ${theme.colors.gray3}`};
  }
  ${CardBody} {
    flex: ${({ isExpanded }) => (!isExpanded ? 'auto' : 1)};
    max-height: ${({ maxHeight }) => maxHeight};
    transition: all ease 0.3s;
  }
`
