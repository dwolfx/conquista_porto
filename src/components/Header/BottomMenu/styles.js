import styled from 'styled-components'

import ConquistaIcon from '../../IconExporter'

const arrowSvgStyle = {
  height: '20px',
  width: '15px',
  marginRight: '0px',
  marginLeft: '10px'
}
const basicSvgStyle = {
  fill: '#1c1c1c',
  width: '20px',
  height: '20px',
  marginRight: '10px'
}
const bottomMenuDropdownSvgStyle = {
  fill: '#fff',
  width: '18px',
  height: '18px'
}

export const Menu = styled.div`
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
export const BottomMenuText = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
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
export const SolutionsDropdownText = styled.p`
  color: #1c1c1c;
  font-size: 14px;
  font-weight: 400;
`
export const RelativeParent = styled.div`
  position: relative;
  z-index: 2;
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
export const ArrowDownIcon = styled(ConquistaIcon).attrs({ name: 'arrowdown' })`
  && {
    ${arrowSvgStyle};
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
export const ArrowUpIcon = styled(ConquistaIcon).attrs({ name: 'arrowup' })`
  && {
    ${arrowSvgStyle};
  }
`