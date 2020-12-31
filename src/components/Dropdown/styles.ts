import styled from 'styled-components'
import ConquistaIcon from 'components/IconExporter'
import Text from 'components/Text'

export const RelativeHolder = styled.div<{ disabled: boolean }>`
  position: relative;
  width: auto;
  height: auto;

  ${props =>
    props.disabled &&
    `
      pointer-events: none;
    `}
`
interface IContainerProps {
  isOpen?: boolean
  ref?: any
  zIndex?: number
}

export const Container = styled.div<IContainerProps>`
  transform-origin: top center;
  transform: ${props => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transition: all 0.2s ease-out;
  display: flex;
  padding: 0px;
  border-radius: 4px;
  position: absolute;
  z-index: ${({ zIndex = 7 }) => zIndex};

  ::-webkit-scrollbar {
    display: none;
  }
`

interface IWrapperProps {
  customWidth?: string | null
  containerPadding?: string
  openingSide?: string
}

export const Wrapper = styled.div<IWrapperProps>`
  width: ${props => (props.customWidth ? props.customWidth : '301px')};
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  flex-shrink: 0;
  padding: ${props => props.containerPadding};
  box-shadow: ${props => props.theme.shadows.gray2};
  background-color: ${props => props.theme.colors.white};
`

export const Backdrop = styled.div<{ isOpen: boolean; zIndex: number }>`
  background-color: rgba(0, 0, 0, 0);
  display: ${props => (props.isOpen ? 'block' : 'none')};
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex - 1};
`

export const ItemWrapper = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  justify-items: flex-start;
  cursor: pointer;
  position: relative;

  &&:hover {
    background-color: ${props => props.theme.colors.gray1};
  }
`

export const ItemIconContainer = styled.div<{ alignToEnd?: boolean }>`
  display: flex;
  margin: ${props => (props.alignToEnd ? '0px 21px' : '0px 0px 0px 21px')};
`

export const ItemIcon = styled(ConquistaIcon).attrs(props => ({
  name: props.name,
}))`
  width: 21px;
  height: 21px;
  fill: ${props => props.theme.colors.gray5};
`

export const ItemText = styled(Text)`
  flex: 1;
  margin-left: 21px;
`

export const WrapperChildren = styled(Wrapper)`
  position: absolute;
  margin-left: ${props => (props.openingSide === 'left' ? '-301px' : '301px')};
  top: 0;
`
