import styled from 'styled-components'
import CloseIcon from '../../assets/icons/close.svg'
import commonStyles from '../../styles/theme'

export const ModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all ease 0.3s;
`

export const ModalContainer = styled.div`
  background-color: #fff;
  position: relative;
  width: 900px;
  height: 600px;
  border-radius: 8px;
`

export const ModalHeader = styled.div`
  padding: 28px 35px;
  border-bottom: 1px solid #c7c7c7;
  display: flex;
  align-items: center;

  svg {
    margin-right: 15px;
  }
`

export const ModalTitle = styled.h3`
  flex: 1;
  color: ${commonStyles.colors.lightPrimary};
  font-weight: 300;
  font-size: 22px;
`

export const CloseButton = styled.div`
  mask-image: url(${CloseIcon});
  background-color: #c7c7c7;
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background-color: #33bfff;
  }
`

export const ModalBody = styled.div`
  /* padding: 28px 35px; */
`

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 2;
  display: flex;
  width: 100vw;
  /* width: ${props => (props.isOpen ? '100vw' : 0)}; */
  height: ${props => (props.isOpen ? '100vh' : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  transition: all ease 0.3s;

  ${ModalOverlay} {
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.isOpen ? '1' : '0')};
  }
`
