import styled from 'styled-components'
import ConquistaIcon from 'components/IconExporter'

export const RelativeHolder = styled.div`
  position: relative;
  width: auto;
  height: auto;
`

export const Container = styled.div`
  transform-origin: top center;
  transform: ${props => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transition: all 0.2s ease-out;
  display: flex;
  padding: 0px;
  border-radius: 4px;
  position: absolute;
  z-index: 2;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const Wrapper = styled.div`
  width: 301px;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  flex-shrink: 0;
  padding: ${props => (props.padding ? props.padding : '14px 0')};
  box-shadow: ${props => props.theme.shadows.gray2};
  background-color: ${props => props.theme.colors.white};
`

export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`

export const ItemWrapper = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  justify-items: flex-start;
  cursor: pointer;

  &&:hover {
    background-color: ${props => props.theme.colors.gray1};
  }
`

export const AlignToEndIcon = styled.div`
  margin: ${props => (props.alignToEnd ? '0px 21px' : '0px 0px 0px 21px')};
`

export const ItemIcon = styled(ConquistaIcon).attrs({
  name: props => props.name,
})`
  width: 21px;
  height: 21px;
  fill: ${props => props.theme.colors.gray5};
`

export const ItemText = styled.div`
  flex: 1;
  margin-left: 21px;
`
