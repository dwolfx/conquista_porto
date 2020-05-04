import styled from 'styled-components'

export const LayerContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const LayerHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.gray4};
  display: flex;
  padding: 10px 35px;

  svg {
    margin-right: 15px;
  }
`

export const LayerWrapper = styled.div`
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  display: flex;
  height: ${props => (props.isOpen ? '100%' : 0)};
  justify-content: center;
  left: 0;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  overflow: auto;
  position: fixed;
  top: 0;
  transition: all ease 0.3s;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  width: 100vw;
  z-index: 13;
`

export const ChildrenWrapper = styled.div`
  overflow: auto;
  padding: 0px;
  height: 100%;
  background-color: ${props => props.theme.colors.gray1};
`
