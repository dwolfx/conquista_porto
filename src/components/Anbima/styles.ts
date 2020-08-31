import styled from 'styled-components'
import { Container, Col, Row } from 'styled-bootstrap-grid'
import { Link as RouterDomLink } from 'react-router-dom'

import TextComponent from 'components/Text'

import AnbimaDistribuicao from 'assets/images/logo-anbima-distribuicao.png'
import AnbimaGestao from 'assets/images/logo-anbima-gestao.png'
import AnbimaInvestir from 'assets/images/logo-anbima-como-investir.png'
import AnbimaCVM from 'assets/images/logo-anbima-cvm.png'

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

export const AnchorTag = styled.a.attrs(() => ({
  target: 'blank',
  rel: 'noopener noreferrer'
}))`

    height: auto;
    margin-right: ${props => props.theme.spacing(3)}px;


  @media ${props => props.theme.mediaQueries.xs} {
    width: 25%;
    margin-right: ${props => props.theme.spacing(2)}px;
  }
`

export const LogoWrapper = styled.div`
    height: auto;
    margin-right: ${props => props.theme.spacing(3)}px;
  

  @media ${props => props.theme.mediaQueries.xs} {
    width: 25%;
    margin-right: ${props => props.theme.spacing(2)}px;
  }
`
const buildLogoComponenet = (src: string, alt: string) => {
  return styled.img.attrs(() => ({ src, alt }))`
    height: 53px;
  
    @media ${props => props.theme.mediaQueries.sm} {
      width: 85px;
    }
  
    @media ${props => props.theme.mediaQueries.xs} {
      width: 100%;
      height: auto;
    }`
} 

export const LogoAnbimaDistribuicao = buildLogoComponenet(AnbimaDistribuicao, 'Logo Anbima - Distribuição')
export const LogoAnbimaGestao = buildLogoComponenet(AnbimaGestao, 'Logo Anbima - Gestao')
export const LogoAnbimaInvestir = buildLogoComponenet(AnbimaInvestir, 'Logo Anbima - Investir')
export const LogoAnbimaCVM = buildLogoComponenet(AnbimaCVM, 'Logo Anbima - CVM')

export const Link = styled(RouterDomLink)``

export const LogosContainer = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 100%;
  height: auto;
`
