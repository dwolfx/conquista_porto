import styled from 'styled-components'

import Icon from 'components/IconExporter'

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
