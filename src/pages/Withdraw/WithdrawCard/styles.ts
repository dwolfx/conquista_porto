import styled from 'styled-components'

import CardComponent from 'components/Card'
import DivisorComponent from 'components/Divisor'

export const Card = styled(CardComponent)`
  height: 100%;
  padding: ${({ theme }) => `${theme.spacing(5)}px`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    border-radius: 0;
    padding: ${({ theme }) => `${theme.spacing(0)}px`};
  }
`

export const Divisor = styled(DivisorComponent)`
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(3)}px`};
  }
`
