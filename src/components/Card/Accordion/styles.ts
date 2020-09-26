import styled from 'styled-components'

import CardCmp from 'components/Card'

interface ICard {
  height: string
}

export const Card = styled(CardCmp)<ICard>`
  height: ${({ height }) => height};
  position: relative;
`
