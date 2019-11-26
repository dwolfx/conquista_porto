import styled from 'styled-components'
import CloseIcon from '../../assets/icons/close.svg'
import commonStyles from '../../styles/theme'

export const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  position: absolute;
  transition: all ease 0.3s;
  width: 100%;
`

export const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  max-height: 600px;
  padding-bottom: 30px;
  position: relative;
  width: ${props => {
    switch (props.size) {
      case 'sm':
        return '490px'
      case 'md':
        return '900px'
      case 'lg':
        return '1200px'
      default:
        return '900px'
    }
  }};
`

export const ModalHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid #c7c7c7;
  display: flex;
  padding: 28px 35px;

  svg {
    margin-right: 15px;
  }
`

export const ModalTitle = styled.h3`
  color: ${commonStyles.colors.lightPrimary};
  flex: 1;
  font-size: 22px;
  font-weight: 300;
`

export const CloseButton = styled.div`
  background-color: #c7c7c7;
  cursor: pointer;
  height: 28px;
  mask-image: url(${CloseIcon});
  transition: all ease 0.3s;
  width: 28px;

  &:hover {
    background-color: #33bfff;
  }
`

export const ModalBody = styled.div`
  /* padding: 28px 35px; */
`

export const ModalWrapper = styled.div`
  align-items: center;
  display: flex;
  height: ${props => (props.isOpen ? '100vh' : 0)};
  justify-content: center;
  left: 0;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: fixed;
  top: 0;
  transition: all ease 0.3s;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  width: 100vw;
  z-index: 4;

  ${ModalOverlay} {
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.isOpen ? '1' : '0')};
  }
`
