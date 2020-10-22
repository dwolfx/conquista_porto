import styled from 'styled-components'
import { Col, Row } from 'styled-bootstrap-grid'

import ButtonComponent from 'components/Button'
import DivisorComponent from 'components/Divisor'
import Text from 'components/Text'

export const GridRow = styled(Row)`
  justify-content: center;
  height: 100%;
`

export const GridCol = styled(Col)`
  height: 100%;
`

export const Title = styled(Text).attrs(() => ({
  type: 'heading4',
  color: 'gray6',
}))`
  margin: ${({ theme }) => `${theme.spacing(2)}px 0 ${theme.spacing(4)}px`};
  text-align: center;
  width: 100%;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    margin: ${({ theme }) => `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`};
  }
`

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin-top: ${({ theme }) => theme.spacing(4)}px;

  @media ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ theme }) => `0 ${theme.spacing(3)}px `};
  }
`

export const Label = styled(Text).attrs(() => ({
  type: 'captionUppercase',
  bold: true,
  color: 'gray5',
}))``

export const Value = styled(Text).attrs(() => ({
  type: 'headline',
  bold: true,
  color: 'gray6',
}))``

export const Divisor = styled(DivisorComponent)`
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
`

export const Button = styled(ButtonComponent)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
  & + & {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  }
`

export const FooterText = styled(Text).attrs(() => ({
  type: 'body',
  bold: true,
  color: 'gray5',
}))`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`
