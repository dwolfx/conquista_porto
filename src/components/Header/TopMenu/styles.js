import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import ConquistaIcon from 'components/IconExporter'
import DropdownComponent from 'components/Dropdown'
import { Container as DropdownContainer } from 'components/Dropdown/styles'

export const MainContainer = styled.header`
  background-color: ${props => props.theme.colors.gray6};
  width: 100%;
  position: sticky;
  top: 0px;
  z-index: 10;
`
export const Container = styled.div`
  display: flex;
  margin: 0 30px;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 7px 20px;
  position: sticky;
  top: 0;
  z-index: 3;

  @media ${props => props.theme.mediaQueries.sm} {
    margin: 0;
    width: 100%;
  }
  @media (min-width: 768px) {
    padding: 15px 20px;
  }
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'row'};
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : 'auto')};
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  padding: ${props => (props.padding ? props.padding : '0px')};
  background-color: ${props => (props.bgcolor ? props.bgcolor : 'unset')};
  align-self: ${props => props.alignSelf};
  border-bottom: ${props => props.borderBottom};
  cursor: ${props => (props.cursorPointer ? 'pointer' : 'default')};
`
export const LogoLinkWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const RelativeParent = styled.div`
  position: relative;
  z-index: 2;
`
export const NotificationCircle = styled.div`
  display: flex;
  position: absolute;
  background-color: ${props => props.theme.colors.blue4};
  width: 20px;
  height: 20px;
  top: -10px;
  right: 0;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
`
export const DropDownContainer = styled.div`
  width: 500px;
  max-height: 400px;
  background-color: ${props => props.theme.colors.white};
  overflow: auto;
  box-shadow: 0px 10px 15px 2px rgba(0, 0, 0, 0.1);
  &:before {
    content: '';
    position: absolute;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    border-bottom: 15px solid
      ${props =>
        props.isRead ? props.theme.colors.gray2 : props.theme.colors.white};
    top: 0px;
    right: 3px;
    z-index: -1;
  }
`
export const DropDownTriangle = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  background-color: ${props => props.theme.colors.white};
  transform: rotate(45deg);
`
export const ResponsiveTextWrapper = styled.div`
  display: flex;
  @media (max-width: 989px) {
    display: none;
  }
`
export const ResponsiveWrapper = styled.div`
  width: 100%;
  justify-content: center;
  @media (min-width: 990px) {
    display: none;
  }
`
export const LinkText = styled(NavLink)`
  padding: 7px 0px;
  margin: 0px 20px;
  color: ${props => props.theme.colors.white};
  font-size: 20px;
  text-align: center;
  &&.active {
    border-bottom: 1px solid ${props => props.theme.colors.white};
  }
  @media (max-width: 989px) {
    display: none;
  }
`
export const Text = styled.p`
  margin: 0 20px;
  text-transform: uppercase;
  color: ${props => props.theme.colors.white};
  font-size: 11px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 1.5px;
`
export const NewNotificationsNumber = styled.p`
  color: ${props => props.theme.colors.white};
  font-size: 10px;
  cursor: pointer;
`
export const BlueText = styled.p`
  color: ${props => props.theme.colors.blue4};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-align: center;
  text-transform: uppercase;
  line-height: 21px;
  cursor: pointer;
`
export const BellIcon = styled(ConquistaIcon).attrs(() => ({ name: 'bell' }))`
  && {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    cursor: pointer;
  }
`
export const MenuIcon = styled(ConquistaIcon).attrs(() => ({ name: 'menu' }))`
  && {
    width: 32px;
    height: 32px;
    fill: ${props => props.theme.colors.white};
    cursor: pointer;
    @media (min-width: 990) {
      display: none;
    }
  }
`
export const Dropdown = styled(DropdownComponent)`
  top: 25px;
  left: -470px;
  ${DropdownContainer} {
    padding-top: 8px;
    background-color: transparent;
  }
`

export const ModalContent = styled.div`
  margin: 30px;
`
