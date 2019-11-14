import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import ConquistaIcon from '../../IconExporter'

const basicSvgStyle = {
  fill: '#1c1c1c',
  width: '20px',
  height: '20px',
  marginRight: '10px'
}
const notificationDropdownSvgStyle = {
  fill: '#30C5FF',
  marginRight: '0px'
}

export const Container = styled.header`
  display: flex;
  width: 100%;
  height: auto;
  background-color: #34373e;
  justify-content: center;
  align-items: center;
  padding: 7px 22px;
  position: sticky;
  top: 0;
  z-index: 2;

  @media (min-width: 768px) {
    padding: 15px 25px;
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
export const RelativeParent = styled.div`
  position: relative;
  z-index: 2;
`
export const NotificationCircle = styled.div`
  display: flex;
  position: absolute;
  background-color: #ff7433;
  width: 20px;
  height: 20px;
  top: -10px;
  right: -10px;
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
export const DropDownWrapper = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: flex-end;
  transition: transform 0.3s ease-out;
  transform: ${props => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top center;
  top: ${props => `${props.top}px`};
  left: ${props => `${props.left}px`};
`
export const DropDownContainer = styled.div`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  background-color: #fff;
  margin-top: 5px;
  overflow: auto;
  box-shadow: 0px 10px 15px 2px rgba(0, 0, 0, 0.1);
`
export const TriangleHolder = styled.div`
  margin-top: 5px;
  margin-right: 29px;
`
export const DropDownTriangle = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  background-color: #fff;
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
  color: #fff;
  font-size: 20px;
  text-align: center;
  &&.active {
    border-bottom: 1px solid #fff;
  }
  @media (max-width: 989px) {
    display: none;
  }
`
export const Text = styled.p`
  margin: ${props => (props.margin ? props.margin : '0px')};
  color: ${props => (props.color ? props.color : '#fff')};
  font-size: ${props => (props.size ? `${props.size}px` : '20px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : 0)};
  letter-spacing: ${props =>
    props.letterSpacing ? `${props.letterSpacing}px` : '0px'};
  text-transform: ${props => (props.upperCase ? 'uppercase' : 'none')};
  line-height: ${props => `${props.lineHeight}px`};
  text-align: ${props => props.textAlign};
  cursor: ${props => (props.cursorPointer ? 'pointer' : 'default')};
`
export const BlueText = styled.p`
  color: #33beff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-align: center;
  text-transform: uppercase;
  line-height: 21px;
  cursor: pointer;
`

export const BellIcon = styled(ConquistaIcon).attrs({ name: 'bell' })`
  && {
    fill: #fff;
    width: 24px;
    height: 24px;
    margin-right: 0px;
    cursor: pointer;
  }
`
export const RemoveIcon = styled(ConquistaIcon).attrs({ name: 'remove' })`
  ${basicSvgStyle};
  && {
    ${notificationDropdownSvgStyle};
  }
`
export const ThumbsUpIcon = styled(ConquistaIcon).attrs({ name: 'thumbsup' })`
  ${basicSvgStyle};
  && {
    ${notificationDropdownSvgStyle};
  }
`
export const AddIcon = styled(ConquistaIcon).attrs({ name: 'add' })`
  ${basicSvgStyle};
  && {
    ${notificationDropdownSvgStyle};
  }
`
export const AlertRoundedIcon = styled(ConquistaIcon).attrs({
  name: 'alertrounded'
})`
  ${basicSvgStyle};
  && {
    ${notificationDropdownSvgStyle};
  }
`
export const ArrowRightIcon = styled(ConquistaIcon).attrs({
  name: 'arrowright'
})`
  && {
    width: ${props => (props.size ? `${props.size}px` : '16px')};
    height: ${props => (props.size ? `${props.size}px` : '16px')};
    fill: #30c5ff;
    margin-right: 0px;
  }
`
export const MenuIcon = styled(ConquistaIcon).attrs({ name: 'menu' })`
  && {
    width: 32px;
    height: 32px;
    fill: #fff;
    cursor: pointer;
    @media (min-width: 990) {
      display: none;
    }
  }
`
