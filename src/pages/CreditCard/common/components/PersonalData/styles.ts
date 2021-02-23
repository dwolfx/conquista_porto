import styled from 'styled-components'

import Card from 'components/Card'
import { CardHeader } from 'components/Card/styles'

export const Wrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: 0;
  }
`

export const StyledCard = styled(Card)`
  ${CardHeader} {
    border-bottom: 0;
  }
`
