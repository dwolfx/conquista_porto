import styled from 'styled-components'

import CloseIcon from 'assets/icons/close.svg'

export const ModalOverlay = styled.div`
  background-color: rgba(39, 39, 39, 0.63);
  height: 100%;
  position: fixed;
  transition: all ease 0.3s;
  width: 100%;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  left: 0;
  top: 0;
`

export const ChildrenWrapper = styled.div`
  overflow: auto;
  padding: 28px;

  @media ${props => props.theme.mediaQueries.sm} {
    padding: 21px;
  }

  &.empty-children-wrapper {
    padding: 0px;

    @media ${props => props.theme.mediaQueries.sm} {
      padding: 0px;
    }
  }
`

export const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.gray4};
  border-radius: 8px;
  position: fixed;
  max-width: ${props => props.maxWidth};
  min-width: 400px;
  margin: 28px 0;
  max-height: calc(100vh - (28px * 2));
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    margin: 0px;
    border-radius: 0px;
  }

  @media ${props => props.theme.mediaQueries.xs} {
    min-width: unset;
    margin: 0 auto;
    width: calc(100vw - 30px);
  }

  &.fullScreen {
    height: 100%;
    max-height: 100%;
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    margin: 0;
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

  &.empty-header {
    padding: 10px 35px;
  }
`

export const ModalTitle = styled.h3`
  ${props => props.theme.fontTypes.heading4}
  color: ${props => props.theme.colors.gray6};
  font-weight: normal;
  flex: 1;
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

  &.empty-close-button {
    height: 24px;
    width: 24px;
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
