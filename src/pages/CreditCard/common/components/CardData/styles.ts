import styled from 'styled-components'

import Card from 'components/Card'
import { CardHeader } from 'components/Card/styles'

export const StyledCard = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  ${CardHeader} {
    border-bottom: 0;
  }
`

export const Wrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`