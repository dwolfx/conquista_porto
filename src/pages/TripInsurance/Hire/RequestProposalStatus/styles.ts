import styled from 'styled-components'

import {
  Container as ContainerComponent,
  Row as RowComponent,
} from 'styled-bootstrap-grid'

import ButtonComponent from 'components/Button'
import CardComponent from 'components/Card'
import { CardFooter } from 'components/Card/styles'
import Icon from 'components/IconExporter'
import Text from 'components/Text'

export const Card = styled(CardComponent)`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(1)}px`};
  }
`

export const StatusCard = styled(CardComponent)`
  height: calc(100vh - 272px);

  ${CardFooter} {
    justify-content: flex-end;
    padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
    @media ${({ theme }) => theme.mediaQueries.xs} {
      padding: 0;
    }
  }

  @media ${({ theme }) => theme.mediaQueries.lg} {
    height: calc(100vh - 179px);
  }

  @media ${({ theme }) => theme.mediaQueries.md} {
    height: calc(100vh - 272px);
    min-height: 264px;
    margin: ${({ theme }) => `${theme.spacing(2)}px 0`};
  }

  @media ${({ theme }) => theme.mediaQueries.xs} {
    height: calc(100vh - 272px);
    margin: ${({ theme }) => `0 ${theme.spacing(1)}px ${theme.spacing(2)}px`};
  }
`

export const Container = styled(ContainerComponent)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Row = styled(RowComponent)`
  height: calc(100vh - 174px);

  @media ${({ theme }) => theme.mediaQueries.xs} {
    align-items: flex-start;
  }
`

export const HeaderWrapper = styled.div`
  height: 63px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
`

export const CardBodyWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const ContentWrapper = styled.div`
  display: flex;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
    flex-direction: row;
  }
`

export const IconWrapper = styled.div`
  margin-right: ${({ theme }) => theme.spacing(3)}px;

  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const ErrorIcon = styled(Icon).attrs(() => ({
  name: 'closerounded',
  color: 'magenta2',
  width: '28px',
}))``

export const SuccessIcon = styled(Icon).attrs(() => ({
  name: 'check',
  color: 'green4',
  width: '28px',
}))``

export const SumaryTextWrapper = styled.div`
  margin: ${({ theme }) => `${theme.spacing(2)}px 0`};
`

export const StatusTextWrapper = styled.div`
  width: 441px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    width: auto;
  }
`
export const Button = styled(ButtonComponent).attrs(() => ({
  color: 'primary',
}))`
  @media ${({ theme }) => theme.mediaQueries.xs} {
    width: 100%;
  }
`

export const TextTitle = styled(Text).attrs(() => ({
  bold: true,
  type: 'captionUppercase',
  color: 'gray5',
}))`
  margin: ${({ theme }) =>
    `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(
      1
    )}px ${theme.spacing(2)}px`};
`

export const TextValue = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))`
  margin: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}px 0`};
`

export const TextStatusTitle = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`
export const TextStatusDescription = styled(Text).attrs(() => ({
  type: 'body',
  bold: true,
  color: 'gray5',
}))``
