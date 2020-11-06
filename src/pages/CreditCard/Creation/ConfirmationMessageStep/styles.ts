import styled from 'styled-components'
import { Container, Col, Row } from 'styled-bootstrap-grid'

import CardImg from 'assets/images/card-example.svg';

import Card from 'components/Card'
import Text from 'components/Text'
import Icon from 'components/IconExporter'
import Divisor from 'components/Divisor'

export const GridContainer = styled(Container)``
export const GridRow = styled(Row)``
export const GridCol = styled(Col)``

export const StyledCard = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  height: auto;

  @media ${({ theme }) => theme.mediaQueries.mdUp} {
    height: 100%;
  }
`

export const WrapperContent = styled.div`
  height: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const BoxContainer = styled.div`
  display: flex;
  max-width: 700px;

  @media ${({ theme }) => theme.mediaQueries.lg} {
    max-width: 480px;
  }
`

export const IconWrapper = styled.div`
  padding-right: ${({ theme }) => theme.spacing(3)}px;
`

export const ErrorIcon = styled(Icon).attrs(() => ({
  name: 'closerounded',
  color: 'magenta2',
  width: '28px'
}))``

export const PendingIcon = styled(Icon).attrs(() => ({
  name: 'alertrounded',
  color: 'yellow2',
  width: '28px'
}))``

export const SuccessIcon = styled(Icon).attrs(() => ({
  name: 'check',
  color: 'green4',
  width: '28px'
}))``

export const BoxContent = styled.div`
  max-width: 725px;
`

export const ListWrapper = styled.ul``

export const StyledItem = styled.li`
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export const StyledCaption = styled(Text).attrs({
  type: 'caption',
  color: 'gray5'
})`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const Title = styled(Text).attrs({
  type: 'headline',
  color: 'gray6',
  bold: true,
})`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

export const Description = styled(Text).attrs({
  type: 'body',
  color: 'gray5',
})`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;;
  &> a {
   color: ${props => props.theme.colors.blue4};
   font-weight: 400;
  }
`

export const StyledDivisor = styled(Divisor)`
  margin: ${({ theme }) => theme.spacing(1)}px 0;
`

export const CreditCardImg = styled.img.attrs({
  src: CardImg,
  alt: 'Cartão de crédito'
})`
  width: 180px;
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  margin-top: ${({ theme }) => theme.spacing(2)}px;

  @media ${({ theme }) => theme.mediaQueries.md} {
    width: 300px;
  }
`

export const FooterWrapper = styled.div`
  width: 100%;
  text-align: right;
`
