import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import ConquistaIcon from '../IconExporter'

const basicSvgStyle = {
  fill: '#1c1c1c',
  width: '20px',
  height: '20px',
  marginRight: '10px'
}
const arrowSvgStyle = {
  height: '20px',
  width: '15px',
  marginRight: '0px',
  marginLeft: '10px'
}
const notificationDropdownSvgStyle = {
  fill: '#30C5FF',
  marginRight: '0px'
}
const bottomMenuDropdownSvgStyle = {
  fill: '#fff',
  width: '18px',
  height: '18px'
}

export const Container = styled.header``

export const TopMenu = styled.div`
  display: flex;
  background-color: #34373e;
  width: 100%;
  padding: 15px;
  justify-content: space-around;
  align-items: center;
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
export const SolutionsItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #c7c7c7;
  cursor: pointer;
`
export const SolutionsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  ${SolutionsItem}:last-child {
    border-bottom: none;
  }
`
export const WrapperMenuTop = styled.div`
  display: flex;
  width: ${props => props.width};
  height: auto;
  justify-content: ${props => (props.justify ? props.justify : 'center')};
  align-items: center;
  @media (max-width: 989px) {
    margin: ${props => (props.margin ? props.margin : '0px')};
  }
`
export const Logo = styled.a`
  background-color: #fff;
  width: 150px;
  height: 60px;
  margin-right: 20px;
  cursor: pointer;
  @media (max-width: 989px) {
    margin-right: 0px;
  }
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
export const BottomMenu = styled.div`
  display: flex;
  background-color: #fff;
  width: 100%;
  padding: 15px;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0px 2px 8px 0px rgba(130, 130, 130, 0.38);

  @media (max-width: 989px) {
    display: none;
  }
`
export const WrapperBottomMenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &&:hover {
    svg {
      transition: all 0.2s ease-in-out;
      fill: #30c5ff;
    }
    p {
      transition: all 0.2s ease-in-out;
      color: #30c5ff;
    }
  }
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
export const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 1;
`
export const ResponsiveTextWrapper = styled.div`
  display: flex;
  @media (max-width: 989px) {
    display: none;
  }
`
export const ResponsiveLogoWrapper = styled.div`
  display: flex;
  @media (max-width: 989px) {
    width: 100%;
    justify-content: center;
  }
`
export const ResponsiveWrapper = styled.div`
  width: 100%;
  @media (min-width: 990px) {
    display: none;
  }
`
export const IconCircle = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => (props.color ? props.color : '#C7C7C7')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
export const BottomMenuText = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
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
export const SolutionsDropdownText = styled.p`
  color: #1c1c1c;
  font-size: 14px;
  font-weight: 400;
`
export const AppsIcon = styled(ConquistaIcon).attrs({ name: 'apps' })`
  ${basicSvgStyle};
`
export const DiamondIcon = styled(ConquistaIcon).attrs({ name: 'diamond' })`
  ${basicSvgStyle};
`
export const GearIcon = styled(ConquistaIcon).attrs({ name: 'gear' })`
  ${basicSvgStyle};
`
export const IdeaIcon = styled(ConquistaIcon).attrs({ name: 'idea' })`
  ${basicSvgStyle};
`
export const TargetIcon = styled(ConquistaIcon).attrs({ name: 'target' })`
  ${basicSvgStyle};
`
export const BarChartIcon = styled(ConquistaIcon).attrs({ name: 'barchart' })`
  ${bottomMenuDropdownSvgStyle}
`
export const CarIcon = styled(ConquistaIcon).attrs({ name: 'car' })`
  ${bottomMenuDropdownSvgStyle}
`
export const CreditCardIcon = styled(ConquistaIcon).attrs({
  name: 'creditcard'
})`
  ${bottomMenuDropdownSvgStyle}
`
export const HomeWithWindowIcon = styled(ConquistaIcon).attrs({
  name: 'homewithwindow'
})`
  ${bottomMenuDropdownSvgStyle}
`
export const MoneyIcon = styled(ConquistaIcon).attrs({ name: 'money' })`
  ${bottomMenuDropdownSvgStyle}
`
export const PersonGroupIcon = styled(ConquistaIcon).attrs({
  name: 'persongroup'
})`
  ${bottomMenuDropdownSvgStyle}
`
export const PlaneIcon = styled(ConquistaIcon).attrs({ name: 'plane' })`
  ${bottomMenuDropdownSvgStyle}
`
export const TimeIcon = styled(ConquistaIcon).attrs({ name: 'time' })`
  ${bottomMenuDropdownSvgStyle}
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
export const ArrowDownIcon = styled(ConquistaIcon).attrs({ name: 'arrowdown' })`
  && {
    ${arrowSvgStyle};
  }
`
export const ArrowUpIcon = styled(ConquistaIcon).attrs({ name: 'arrowup' })`
  && {
    ${arrowSvgStyle};
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
