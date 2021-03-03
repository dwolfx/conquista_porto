import styled from 'styled-components'
import { Col, Container as ContainerComp } from 'styled-bootstrap-grid'

import ButtonComp from 'components/Button'
import ButtonLinkCmp from 'components/Button/Link'
import CardComponent from 'components/Card'
import PopoverComp from 'components/Popover'

export const HeaderCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    align-items: flex-start;
  }
`

export const Container = styled(ContainerComp)`
  margin: ${({ theme }) => `${theme.spacing(5)}px auto 0`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `${theme.spacing(5)}px auto 0`};
  }
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
    // align-items: center; DEFINIÇÃO PENDENTE
    align-items: flex-start;
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

export const Popover = styled(PopoverComp)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray3};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const FooterCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0;

  & > :first-child {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }

  @media ${({ theme }) => theme.mediaQueries.smUp} {
    flex-direction: row;
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    & > :first-child {
      margin: ${({ theme }) => `0 0 ${theme.spacing(2)}px 0`};
    }
  }
`

export const Button = styled(ButtonComp)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
    margin-right: 0;
  }
`

export const SubmitButton = styled(ButtonComp).attrs(() => ({
  color: 'secondary',
}))<{ tryAgain: boolean }>`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  width: ${({ tryAgain }) => (tryAgain ? '192' : '134')}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
    margin-right: 0;
  }
`

export const ButtonLink = styled(ButtonLinkCmp)`
  text-align: end;
`
