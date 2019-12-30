import styled from 'styled-components'

import CloseIcon from 'assets/icons/close.svg'

export const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  height: 100%;
  position: fixed;
  transition: all ease 0.3s;
  width: 100%;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
`

export const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 8px;
  position: relative;
  max-width: 900px;
  min-width: 400px;
  margin: 30px 0;

  @media (max-width: 767px) {
    margin: 0px;
    border-radius: 0px;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    min-width: unset;
    margin: 0 auto;
    width: calc(100vw - 30px);
  }
`

export const ModalHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.gray4};
  display: flex;
  padding: 28px 35px;

  svg {
    margin-right: 15px;
  }
`

export const ModalTitle = styled.h3`
  color: ${props => props.theme.colors.blue4};
  flex: 1;
  font-size: 22px;
  font-weight: 300;
`

export const CloseButton = styled.div`
  background-color: ${props => props.theme.colors.gray4};
  cursor: pointer;
  height: 28px;
  mask-image: url(${CloseIcon});
  transition: all ease 0.3s;
  width: 28px;

  &:hover {
    background-color: ${props => props.theme.colors.blue4};
  }
`

export const ModalWrapper = styled.div`
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
