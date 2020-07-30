import styled from 'styled-components'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import { Link as RouterDomLink } from 'react-router-dom'

import TextComponent from 'components/Text'

import AnbimaDistribuicao from 'assets/images/logo-anbima-distribuicao.png'
import AnbimaGestao from 'assets/images/logo-anbima-gestao.png'
import AnbimaInvestir from 'assets/images/logo-anbima-como-investir.png'

export const GridContainer = styled(Container)`
  margin: ${({ theme }) => `${theme.spacing(4)}px auto`};
`

export const GridCol = styled(Col)`
  padding: 0 ${({ theme }) => theme.spacing(3)}px;

  @media ${props => props.theme.mediaQueries.smUp} {
    padding: 0;
  }
`

export const GridRow = styled(Row)``

export const TextWrapper = styled.div`
  margin-bottom: ${props => props.theme.spacing(4)}px;
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
  height: 53px;
  margin-right: ${props => props.theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.smUp} {
    height: auto;
    margin-right: ${props => props.theme.spacing(4)}px;
  }
`

export const LogoAnbimaGestao = styled.img.attrs(() => ({
  src: AnbimaGestao,
  alt: 'Logo Anbima - Gestao',
}))`
  height: 53px;
  margin-right: ${props => props.theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.smUp} {
    height: auto;
    margin-right: ${props => props.theme.spacing(4)}px;
  }
`

export const LogoAnbimaInvestir = styled.img.attrs(() => ({
  src: AnbimaInvestir,
  alt: 'Logo Anbima - Investir',
}))`
  height: 53px;
  margin-right: ${props => props.theme.spacing(1)}px;

  @media ${props => props.theme.mediaQueries.smUp} {
    height: auto;
    margin-right: ${props => props.theme.spacing(4)}px;
  }
`

export const Link = styled(RouterDomLink)``

export const LogosContainer = styled.div`
  display: flex;
  max-width: 100%;
  height: auto;

  a {
    max-width: 100%;
    height: auto;
  }
`
