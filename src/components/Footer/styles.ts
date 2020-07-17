import styled from 'styled-components'
import LinkText from './LinkText'

import { Container, Row, Col } from 'styled-bootstrap-grid'
import ComponentText from 'components/Text'
import LogoPortoSeguro from 'assets/images/logo-institucional.svg'

export const FooterWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
`
export const GridContainer = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(6)}px;
  padding-bottom: ${({ theme }) => theme.spacing(6)}px;
  padding-left: 0;
  padding-right: 0;
  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin-top: ${({ theme }) => theme.spacing(1)}px;
    margin-bottom: ${({ theme }) => theme.spacing(4)}px;
    padding: 0;
    max-width: none;
  }
  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: ${({ theme }) => theme.spacing(1)}px;
    margin-bottom: 0;
    padding: 0;
    max-width: none;
  }
`
export const GridRow = styled(Row)`
  margin-left: 0;
  margin-right: 0;
  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 0;
    margin-right: 0;
  }
`
export const GridRowCopyright = styled(GridRow)<any>`
  @media ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: ${props =>
      props.locationPageHome === '/' ? `${props.theme.spacing(12)}px` : 0};
  }
`
export const GridCol = styled(Col)`
  @media ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(1)}px`};
  }
`
export const UppercaseBlueText = styled(ComponentText).attrs(() => ({
  type: 'body',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.blue4};
  margin: ${({ theme }) => theme.spacing(1)}px 0 0;
  text-transform: uppercase;
`
export const ListWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  @media ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: ${({ theme }) => theme.spacing(2)}px;
    padding-right: ${({ theme }) => theme.spacing(2)}px;
  }
  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 0;
    padding-right: 0;
    margin: 0;
  }
`
export const Logo = styled.img.attrs(() => ({
  src: LogoPortoSeguro,
  alt: 'Logo Conquista Beta',
}))`
  width: 150px;
  height: auto;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`
export const LogoTitle = styled(ComponentText).attrs(() => ({
  type: 'body',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray4};
  text-transform: uppercase;
`
export const LogoText = styled(ComponentText).attrs(() => ({
  type: 'body',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray4};
  margin-top: 0;
`
export const Text = styled(ComponentText).attrs(() => ({
  type: 'body',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray5};
  margin: ${({ theme }) => `${theme.spacing(6)}px ${theme.spacing(2)}px 0`};
  @media ${({ theme }) => theme.mediaQueries.lg} {
    margin: ${({ theme }) => `${theme.spacing(4)}px ${theme.spacing(2)}px 0`};
  }
  @media ${({ theme }) => theme.mediaQueries.xs} {
    margin: ${({ theme }) => theme.spacing(3)}px;
  }
`
export const Title = styled(ComponentText).attrs(() => ({
  type: 'body',
  bold: true,
}))`
  color: ${({ theme }) => theme.colors.gray5};
`
export const OmbudsmantContainerPhones = styled.div`
  display: flex;
`
export const OmbudsmantLinkPhone = styled(LinkText)`
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  padding: 0;
`
