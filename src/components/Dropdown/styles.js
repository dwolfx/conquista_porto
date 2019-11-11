import styled from 'styled-components'

export const RelativeHolder = styled.div`
  position: relative;
`

export const Container = styled.div`
  background-color: #fff;
  width: ${props => (props.width ? `${props.width}` : 'auto')};
  max-height: 400px;
  transform-origin: top center;
  transform: ${props => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transition: all 0.25s ease-out;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0px;
  overflow: auto;
  box-shadow: 2px 4px 5px 1px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  position: absolute;
  z-index: 2;

  ::-webkit-scrollbar {
    display: none;
  }
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
