import styled from 'styled-components'
import { Link } from 'react-router-dom'

import ConquistaIcon from '../../IconExporter'

const arrowSvgStyle = {
  height: '20px',
  width: '15px',
  marginRight: '0px',
  marginLeft: '10px'
}
const basicSvgStyle = {
  height: '20px',
  width: '20px',
  fill: '#1c1c1c',
  marginRight: '10px'
}
const bottomMenuDropdownSvgStyle = {
  height: '18px',
  width: '18px',
  fill: '#fff'
}

export const BottomMenuText = styled.p`
  color: #000;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
`
export const IconCircle = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  background-color: ${props => (props.color ? props.color : '#C7C7C7')};
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
export const Menu = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: #fff;
  align-items: center;
  justify-content: space-around;
  padding: 15px;
  box-shadow: 0px 2px 8px 0px rgba(130, 130, 130, 0.38);

  @media (max-width: 989px) {
    display: none;
  }
`
export const RelativeParent = styled.div`
  position: relative;
  z-index: 2;
`
export const SolutionsDropdownText = styled.p`
  color: #1c1c1c;
  font-size: 14px;
  font-weight: 400;
`
export const SolutionsItem = styled(Link)`
  display: flex;
  width: auto;
  height: auto;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #c7c7c7;
  cursor: pointer;
`
export const SolutionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${SolutionsItem}:last-child {
    border-bottom: none;
  }
`
export const Wrapper = styled.div`
  display: flex;
  height: auto;
  width: 1200px;
  align-items: center;
  justify-content: space-between;
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
export const AppsIcon = styled(ConquistaIcon).attrs({ name: 'apps' })`
  ${basicSvgStyle};
`
export const ArrowDownIcon = styled(ConquistaIcon).attrs({ name: 'arrowdown' })`
  ${basicSvgStyle};
  && {
    ${arrowSvgStyle};
  }
`
export const ArrowRightIcon = styled(ConquistaIcon).attrs({
  name: 'arrowright'
})`
  ${basicSvgStyle};
  && {
    height: ${props => (props.size ? `${props.size}px` : '16px')};
    width: ${props => (props.size ? `${props.size}px` : '16px')};
    fill: #30c5ff;
    margin-right: 0px;
  }
`
export const ArrowUpIcon = styled(ConquistaIcon).attrs({ name: 'arrowup' })`
  ${basicSvgStyle};
  && {
    ${arrowSvgStyle};
  }
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
export const DiamondIcon = styled(ConquistaIcon).attrs({ name: 'diamond' })`
  ${basicSvgStyle};
`
export const GearIcon = styled(ConquistaIcon).attrs({ name: 'gear' })`
  ${basicSvgStyle};
`
export const HomeWithWindowIcon = styled(ConquistaIcon).attrs({
  name: 'homewithwindow'
})`
  ${bottomMenuDropdownSvgStyle}
`
export const IdeaIcon = styled(ConquistaIcon).attrs({ name: 'idea' })`
  ${basicSvgStyle};
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
export const TargetIcon = styled(ConquistaIcon).attrs({ name: 'target' })`
  ${basicSvgStyle};
`
export const TimeIcon = styled(ConquistaIcon).attrs({ name: 'time' })`
  ${bottomMenuDropdownSvgStyle}
`
