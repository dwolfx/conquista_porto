import styled from 'styled-components'

import ButtonCmp from 'components/Button'
import IconCmp from 'components/IconExporter'
import LayerCmp from 'components/Layer'
import { ChildrenWrapper } from 'components/Layer/styles'
import TextCmp from 'components/Text'

export const Text = styled(TextCmp).attrs(() => ({
  type: 'headline',
  color: 'gray6',
}))`
  max-width: 364px;
  padding-bottom: ${({ theme }) => theme.spacing(5)}px;
`

export const Layer = styled(LayerCmp)<{ hasMarginBottom: boolean }>`
  ${ChildrenWrapper} {
    margin-bottom: ${({ hasMarginBottom, theme: { spacing } }) =>
      hasMarginBottom ? `${spacing(9)}px` : '0'};

    @media ${({ theme }) => theme.mediaQueries.xs} {
      margin-bottom: ${({ hasMarginBottom, theme: { spacing } }) =>
        hasMarginBottom ? `${spacing(16)}px` : '0'};
    }
  }
`

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`

export const PreviousIcon = styled(IconCmp).attrs(() => ({
  name: 'arrowleft',
}))`
  cursor: pointer;
  transition: all ease 0.3s;
  position: absolute;

  &:hover {
    fill: ${props => props.theme.colors.blue4};
  }
`

export const LogoWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CloseIcon = styled(IconCmp).attrs(() => ({
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

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Button = styled(ButtonCmp)`
  & + & {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`
