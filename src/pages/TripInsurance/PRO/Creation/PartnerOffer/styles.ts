import styled from 'styled-components'

import DivisorComp from 'components/Divisor'
import Icon from 'components/IconExporter'
import ButtonCmp from 'components/Button'
import LayerCmp from 'components/Layer'
import TextCmp from 'components/Text'
import ModalCmp from 'components/Modal/ModalNew'

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`

export const PageWrapper = styled.div`
  height: 100vh;
  overflow: auto;
`

export const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseIcon = styled(Icon).attrs(() => ({
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

export const PreviousIcon = styled(Icon).attrs(() => ({
  name: 'arrowleft',
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const WhiteContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  min-height: calc(100% - 56px);
  display: flex;
  align-items: center;
`

export const Button = styled(ButtonCmp)`
  & + & {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

export const Text = styled(TextCmp).attrs(() => ({
  type: 'headline',
  color: 'gray6',
}))`
  max-width: 364px;
  padding-bottom: ${({ theme }) => theme.spacing(5)}px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Layer = styled(LayerCmp)``

export const Modal = styled(ModalCmp)``

export const NavWrapper = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`};
  width: 100%;
  position: sticky;
  top: 0;
`

export const NavTitleWrapper = styled.div`
  padding: ${({ theme }) => `${theme.spacing(1)}px 0`};
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

export const TagsWrapper = styled.div`
  width: 60%;
`

export const Tag = styled.div<{ active: boolean }>`
  display: flex;
  height: 22px;
  align-items: center;
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
  padding-left: ${({ theme }) => theme.spacing(3)}px;

  ${({ active, theme }) =>
    active
      ? `
    border-left: 2px solid ${theme.colors.blue4};
  `
      : ''}

  &:hover {
    background-color: #ebebeb;
  }
`

export const TagText = styled(TextCmp).attrs(() => ({
  type: 'caption',
  color: 'gray6',
  bold: true,
}))`
  cursor: pointer;
`

export const SectionTitleWrapper = styled.div`
  height: 29px;
  padding-left: ${({ theme }) => theme.spacing(2)}px;
  display: flex;
  align-items: flex-start;
`

export const Divisor = styled(DivisorComp)<{ vertical?: boolean }>`
  margin: ${({ theme }) => `${theme.spacing(1)}px 0`};
  ${({ theme, vertical }) => {
    if (vertical) {
      return `margin: 11px ${theme.spacing(10)}px;`
    }
  }}
`

export const BadgeNotification = styled.span`
  padding: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.magenta2};
  margin-left: 3px;
  margin-bottom: 6px;
`
