import styled from 'styled-components'
import { Container as ContainerComp } from 'styled-bootstrap-grid'
import CardComponent from 'components/Card'
import ButtonComp from 'components/Button'
import Text from 'components/Text'

export const Container = styled(ContainerComp)`
  margin: ${({ theme }) =>
    `${theme.spacing(3)}px auto ${theme.spacing(9)}px auto`};
`

export const HeaderWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing(3)}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    align-items: flex-start;
    margin: ${({ theme }) => `0 0 ${theme.spacing(4)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    align-items: flex-start;
    margin: ${({ theme }) => `0 0 ${theme.spacing(4)}px`};
  }
`

export const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}px 0`};

  @media ${({ theme }) => theme.mediaQueries.lg} {
    justify-content: flex-start;
    align-items: center;
    padding: ${({ theme }) => `${theme.spacing(2)}px 0 0`};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: flex-start;
    align-items: center;
    padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(2)}px 0`};
  }
`

export const Card = styled(CardComponent)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `0 ${theme.spacing(1)}px ${theme.spacing(2)}px`};
  }
`

export const CardWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    padding: ${({ theme }) => theme.spacing(2)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: ${({ theme }) => `${theme.spacing(2)}px 0`};
  }
`

export const CardTitleWrapper = styled.div`
  margin: ${({ theme }) => `0 0 ${theme.spacing(4)}px ${theme.spacing(2)}px`};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: ${({ theme }) => `0 0 ${theme.spacing(4)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `0 ${theme.spacing(2)}px ${theme.spacing(4)}px`};
  }
`

export const CardTitleText = styled(Text)`
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    width: auto;
  }
`

export const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const FixedFooter = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 63px;
  background: ${({ theme }) => theme.colors.white};
`

export const FooterContainer = styled(ContainerComp)`
  display: flex;
  justify-content: flex-end;
  margin: ${({ theme }) => theme.spacing(2)}px auto;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Button = styled(ButtonComp)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`
