import styled from 'styled-components'
import LogoConquistaBeta from 'assets/images/logoConquistaBeta.png'

import IconComponent from 'components/IconExporter'
import ButtonComponent from 'components/Button'
import TextComponent from 'components/Text'

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Button = styled(ButtonComponent)`
  & + & {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Text = styled(TextComponent).attrs(() => ({
  type: 'headline',
  color: 'gray6',
}))`
  max-width: 364px;
  padding-bottom: ${({ theme }) => theme.spacing(5)}px;
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`

export const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseIcon = styled(IconComponent).attrs(() => ({
  name: 'close',
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;
  right: 12px;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const PreviousIcon = styled(IconComponent).attrs(() => ({
  name: 'arrowleft',
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const Logo = styled.img.attrs(() => ({
  src: LogoConquistaBeta,
  alt: 'Logo Conquista Beta',
}))``
