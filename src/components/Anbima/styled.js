import styled from 'styled-components'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import { Link as RouterDomLink } from 'react-router-dom'

import ComponentText from 'components/Text'

import AnbimaGestao from 'assets/images/logo-anbima-gestao.png'
import AnbimaDistribuicao from 'assets/images/logo-anbima-distribuicao.png'
import AnbimaComoInvestir from 'assets/images/logo-anbima-como-investir.png'

export const GridContainer = styled(Container)`
  margin: 28px 0;
`

export const GridCol = styled(Col)``

export const GridRow = styled(Row)``

export const Text = styled(ComponentText).attrs(() => ({
  bold: true,
}))`
  margin-bottom: 28px;
`

export const UppercaseBlueText = styled.span.attrs(() => ({
  bold: true,
}))`
  color: ${props => props.theme.colors.blue4};
  text-transform: uppercase;
`

export const LogoAnbimaDistribuicao = styled.img.attrs(() => ({
  src: AnbimaDistribuicao,
  alt: 'Logo Anbima - Distribuição',
}))`
  margin-right: 28px;
`

export const LogoAnbimaGestao = styled.img.attrs(() => ({
  src: AnbimaGestao,
  alt: 'Logo Anbima - Gestão',
}))`
  margin-right: 28px;
`

export const LogoComoInvestir = styled.img.attrs(() => ({
  src: AnbimaComoInvestir,
  alt: 'Como Investir',
}))``

export const Link = styled(RouterDomLink)``
