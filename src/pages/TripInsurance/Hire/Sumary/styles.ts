import styled from 'styled-components'
import { Col, Container as ContainerComp } from 'styled-bootstrap-grid'

import ButtonComp from 'components/Button'
import CardComponent from 'components/Card'
import HorizontalListComp from 'components/HorizontalList'
import VerticalListComp from 'components/VerticalList'
import { StartBlock, EndBlock } from 'components/HorizontalList/styles'

export const HorizontalList = styled(HorizontalListComp)`
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-start;
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`};

  ${StartBlock} {
    width: 161px;
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }

  ${EndBlock} {
    width: auto;
  }
`

export const VerticalList = styled(VerticalListComp)`
  margin: ${({ theme }) => theme.spacing(2)}px;
  width: auto;
`

export const HeaderCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    align-items: flex-start;
  }
`

export const Container = styled(ContainerComp)`
  margin: ${({ theme }) =>
    `${theme.spacing(5)}px auto ${theme.spacing(13)}px auto`};
`

export const Card = styled(CardComponent)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `0 ${theme.spacing(1)}px ${theme.spacing(2)}px`};
  }
`
export const HeaderWrapper = styled.div`
  margin-left: ${({ theme }) => theme.spacing(3)}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    align-items: center;
    margin: ${({ theme }) => `0 0 ${theme.spacing(4)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    align-items: flex-start;
    margin: ${({ theme }) => `0 ${theme.spacing(2)}px ${theme.spacing(4)}px 0`};
  }
`
export const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
    align-items: center;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    justify-content: flex-start;
    align-items: center;
  }
`
export const CardContentWrapper = styled.div`
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
  align-items: center;
  justify-content: space-between;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: ${({ theme }) => `0 0 ${theme.spacing(4)}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `0 ${theme.spacing(2)}px ${theme.spacing(4)}px`};
  }
`
export const FixedFooter = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${({ theme }) => theme.spacing(15)}px;
  width: 100vw;
  height: 63px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: 0;
  }
`

export const Button = styled(ButtonComp).attrs(() => ({
  color: 'secondary',
}))<{ tryAgain: boolean }>`
  width: ${({ tryAgain }) => (tryAgain ? '192' : '134')}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
    margin: ${({ theme }) => theme.spacing(2)}px;
  }
`
