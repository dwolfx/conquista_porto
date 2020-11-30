import Divisor from 'components/Divisor'
import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import styled from 'styled-components'

export const CoverageWrapper = styled.div`
  padding: 0px ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    padding: 0px ${({ theme }) => theme.spacing(1)}px
      ${({ theme }) => theme.spacing(2)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: 0px ${({ theme }) => theme.spacing(3)}px
      ${({ theme }) => theme.spacing(1)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0px ${({ theme }) => theme.spacing(1)}px
      ${({ theme }) => theme.spacing(1)}px;
  }
`

export const CoverageVerticalList = styled(VerticalList)`
  padding: 0px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ theme }) => theme.spacing(1)}px 0px;
  }

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0px ${({ theme }) => theme.spacing(2)}px;
  }
`

export const CoverageText = styled(Text)`
  width: 220px;
`

export const Divider = styled(Divisor)`
  margin: ${({ theme }) => theme.spacing(1)}px 0px;
`
