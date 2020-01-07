import styled from 'styled-components'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import ComponentText from 'components/Text'
import LogoPortoSeguro from 'assets/images/logo-institucional.svg'

export const GridContainer = styled(Container)`
  padding-top: 14px;
  @media ${props => props.theme.mediaQueries.lgUp} {
    height: 345px;
  }
  @media ${props => props.theme.mediaQueries.xs} {
    padding-top: 7px;
  }
`
export const GridRow = styled(Row)``
export const GridCol = styled(Col)`
  @media ${props => props.theme.mediaQueries.xs} {
    padding: 14px 7px;
    border-bottom: 1px solid ${props => props.theme.colors.gray2};
    &:nth-child(2) {
      padding: 21px 7px 14px;
    }
  }
`
export const BorderTop = styled.div`
  width: 100%;
  border-top: 1px solid ${props => props.theme.colors.gray2};
`
export const UppercaseBlueText = styled(ComponentText).attrs({
  type: 'body',
  bold: true,
})`
  color: ${props => props.theme.colors.blue4};
  margin: 7px 0 0;
  text-transform: uppercase;
`
export const ListWrapper = styled.div`
  & > * {
    margin-bottom: 7px;
  }
`
export const Logo = styled.img.attrs({
  src: LogoPortoSeguro,
  alt: 'Logo Conquista Beta',
})`
  width: 150px;
  height: auto;
  margin-top: 7px;
`
export const LogoTitle = styled(ComponentText).attrs({
  type: 'body',
  bold: true,
})`
  color: ${props => props.theme.colors.gray4};
  text-transform: uppercase;
`
export const LogoText = styled(ComponentText).attrs({
  type: 'body',
  bold: true,
})`
  color: ${props => props.theme.colors.gray4};
  margin-top: 14px;
  @media ${props => props.theme.mediaQueries.xs} {
    margin-top: 7px;
  }
`
export const Text = styled(ComponentText).attrs({ type: 'body', bold: true })`
  color: ${props => props.theme.colors.gray5};
  margin: 21px 14px;
  @media ${props => props.theme.mediaQueries.xs} {
    margin: 7px 14px;
  }
`
export const Title = styled(ComponentText).attrs({ type: 'body', bold: true })`
  color: ${props => props.theme.colors.gray5};
`
