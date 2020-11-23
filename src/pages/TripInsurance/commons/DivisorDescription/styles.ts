import styled from 'styled-components'

import Text from 'components/Text'
import Divisor from 'components/Divisor'

export const Wrapper = styled.div`
  width: 100%;
`

export const PaddingText = styled(Text)`
  padding: 0 ${({ theme }) => theme.spacing(2)}px;
`

export const StyledDivisor = styled(Divisor)`
  margin: ${({ theme }) => theme.spacing(3)}px 0;
`
