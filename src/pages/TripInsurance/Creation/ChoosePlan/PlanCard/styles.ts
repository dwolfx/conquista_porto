import styled from 'styled-components'
import Card from 'components/Card'
import Text from 'components/Text'
import Divisor from 'components/Divisor'
import Button from 'components/Button'

export const CardComponent = styled(Card)`
  margin-right: 14px;

  &:last-of-type {
    margin-right: 0px;
  }
  padding: ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(2)}px ${({ theme }) => theme.spacing(2)}px;
  width: 418px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    width: 319px;
  }
  @media ${({ theme }) => theme.mediaQueries.md} {
    width: 607px;
    margin-right: 0px;
    margin-bottom: ${({ theme }) => theme.spacing(4)}px;

    &:last-of-type {
      margin-bottom: 0px;
    }
  }
  @media ${({ theme }) => theme.mediaQueries.sm} {
    width: 332px;
  }
`

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 ${({ theme }) => theme.spacing(2)}px
    ${({ theme }) => theme.spacing(3)}px;
`

export const PlanName = styled(Text)`
  width: 264px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    width: 170px;
  }
  @media ${({ theme }) => theme.mediaQueries.md} {
    width: 450px;
  }
  @media ${({ theme }) => theme.mediaQueries.sm} {
    width: 180px;
  }
`

export const PlanNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const Installments = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const ContractButton = styled(Button)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const Divider = styled(Divisor)`
  margin: ${({ theme }) => theme.spacing(1)}px 0px;
`

export const MainCoveragesTitle = styled(Text)`
  padding: ${({ theme }) => theme.spacing(2)}px 0px;
`

export const LoadingWrapper = styled.div``

export const LoadingText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`
