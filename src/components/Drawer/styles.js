import CloseIcon from 'assets/icons/close.svg'
import styled from 'styled-components'
import Text from 'components/Text'

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

export const DrawerBody = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 28px 14px;
`

export const DrawerFooter = styled.div`
  border-top: 1px solid ${props => props.theme.colors.gray2};
  height: 63px;
  display: flex;
  justify-content: center;
  padding: 0 14px;
  align-items: center;
  margin-top: auto;
`

export const DrawerHeader = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray2};
  display: flex;
  justify-content: space-between;
  padding: 10px 14px 14px;
`

export const DrawerTitle = styled(Text).attrs(() => ({ type: 'heading4' }))`
  color: ${props => props.theme.colors.gray6};
`

export const DrawerContent = styled.div`
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.gray4};
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 10px 14px 0 14px;
  position: fixed;
  transition: all ease 0.5s;
  min-width: 390px;
  max-width: 650px;
  top: 0;
  ${props => ({
    [props.positionDrawer]: props.isOpen ? '0' : '-100%',
  })}

  @media ${props => props.theme.mediaQueries.md} {
    max-width: 100%;
  }
`

export const DrawerWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 20;
`

export const DrawerOverlay = styled.div`
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
