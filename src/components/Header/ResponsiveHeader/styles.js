import styled, { css } from 'styled-components'

import ConquistaIcon from '../../IconExporter'

const svgStyle = {
  fill: '#fff',
  width: '23px',
  height: '23px',
  marginRight: '15px'
}
const arrowSvgStyle = {
  fill: '#fff',
  width: '14px',
  height: '14px'
}
const disable = css`
  svg {
    fill: #a2a2a2;
  }
  p {
    color: #a2a2a2;
  }
`
export const Container = styled.div`
  height: auto;
  background-color: #555861;
  transition: transform 0.3s ease-out;
  transform: ${props =>
    props.isOpen ? 'translateX(0%)' : 'translateX(-100%)'};
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 3;
`
export const Logo = styled.a`
  background-color: #fff;
  width: 150px;
  height: 60px;
  margin-right: 20px;
  cursor: pointer;
`
export const ItemContainer = styled.div`
  ${props => props.disable && disable};
  display: flex;
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'row'};
  width: 100%;
  height: auto;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: center;
  padding: ${props => (props.padding ? props.padding : '0px')};
  cursor: pointer;
`
export const TagWrapper = styled.div`
  display: flex;
  padding: 0px 3px;
  border: 1px solid #a2a2a2;
  border-radius: 3px;
  margin-left: 15px;
`
export const ContainerDropdown = styled.div`
  max-height: ${props => (props.isOpen ? '1000px' : '0px')};
  transition: all 0.3s linear;
  width: 100%;
  overflow: hidden;
`
export const ItemContainerDropdown = styled.div`
  ${props => props.disable && disable};
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 0px 35px 35px 35px;
  cursor: pointer;
`
export const WhiteText = styled.p`
  color: ${props => (props.color ? props.color : '#fff')};
  font-size: ${props => (props.size ? `${props.size}px` : '20px')};
  font-weight: 300;
  text-align: center;
  line-height: 39px;
`
export const TagText = styled.p`
  color: ${props => (props.color ? props.color : '#fff')};
  line-height: 15px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
`
export const CloseIcon = styled(ConquistaIcon).attrs({ name: 'close' })`
  fill: #fff;
  width: 24px;
  height: 24px;
`
export const AppsIcon = styled(ConquistaIcon).attrs({ name: 'apps' })`
  ${svgStyle};
`
export const ArrowDownIcon = styled(ConquistaIcon).attrs({ name: 'arrowdown' })`
  ${arrowSvgStyle};
`
export const ArrowUpIcon = styled(ConquistaIcon).attrs({ name: 'arrowup' })`
  ${arrowSvgStyle};
`
export const DiamondIcon = styled(ConquistaIcon).attrs({ name: 'diamond' })`
  ${svgStyle};
`
export const GearIcon = styled(ConquistaIcon).attrs({ name: 'gear' })`
  ${svgStyle};
`
export const HomeIcon = styled(ConquistaIcon).attrs({ name: 'home' })`
  ${svgStyle};
`
export const IdeaIcon = styled(ConquistaIcon).attrs({ name: 'idea' })`
  ${svgStyle};
`
export const TargetIcon = styled(ConquistaIcon).attrs({ name: 'target' })`
  ${svgStyle};
`
