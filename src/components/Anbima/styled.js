import styled from 'styled-components'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import { Link as RouterDomLink } from 'react-router-dom'

import TextComponent from 'components/Text'

import AnbimaGestao from 'assets/images/logo-anbima-gestao.png'
import AnbimaDistribuicao from 'assets/images/logo-anbima-distribuicao.png'
import AnbimaComoInvestir from 'assets/images/logo-anbima-como-investir.png'

export const GridContainer = styled(Container)`
  margin: 28px auto;
`

export const GridCol = styled(Col)`
  padding: 0;
`

export const GridRow = styled(Row)``

export const TextWrapper = styled.div`
  margin-bottom: 28px;
`

export const Text = styled(TextComponent).attrs(() => ({
  bold: true,
}))`
  display: inline;
  color: ${props => props.theme.colors.gray5};
`

export const BlueText = styled(TextComponent).attrs(() => ({
  bold: true,
}))`
  display: inline;
  color: ${props => props.theme.colors.blue4};
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
