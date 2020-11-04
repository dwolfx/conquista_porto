import styled from 'styled-components'
import { Row as RowComponent } from 'styled-bootstrap-grid'

import IconButton from 'components/Button/Icon'
import logoConquistaBeta from 'assets/images/logoConquistaBeta.png'
import Icon from 'components/IconExporter'
import AnbimaComponent from 'components/Anbima'
import { TextStyle } from 'components/Text/styles'

export const FloatButton = styled(IconButton)`
  content: '';
  border-radius: 50%;
  position: fixed;
  bottom: 14px;
  right: 14px;
  z-index: 11;
  border: none;
`

export const LogoConquistaBeta = styled.img.attrs(() => ({
  src: logoConquistaBeta,
  alt: 'Logo Conquista Beta',
}))``

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseIcon = styled(Icon)`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;
  right: 12px;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const SubHeader = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayblue1};
  padding: ${({ theme }) => `0 ${theme.spacing(6)}px`};

  @media ${({ theme }) => theme.mediaQueries.xs} {
    padding: ${({ theme }) => `0 ${theme.spacing(2)}px`};
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  > ${TextStyle}:first-of-type {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Anbima = styled(AnbimaComponent)`
  margin-top: 0;
`

export const RowStyled = styled(RowComponent)`
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`
