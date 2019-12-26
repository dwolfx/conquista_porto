import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import ConquistaIcon from 'components/IconExporter'

const svgStyle = css`
  fill: ${props => props.theme.colors.white};
  width: 23px;
  height: 23px;
  margin-right: 15px;
`
const arrowSvgStyle = css`
  fill: ${props => props.theme.colors.white};
  width: 14px;
  height: 14px;
`

const defaultWrapper = css`
  align-items: flex-start;
  background-color: ${props => props.theme.colors.gray6};
  border-bottom: 1px solid ${props => props.theme.colors.white};
  display: flex;
  padding: 15px;
  flex-direction: column;
`

const disabled = css`
  svg {
    fill: ${props => props.theme.colors.gray4};
  }
  p {
    color: ${props => props.theme.colors.gray4};
  }
`
export const Container = styled.div`
  background-color: ${props => props.theme.colors.gray6};
  transition: transform 0.3s ease-out;
  transform: ${props =>
    props.isOpen ? 'translateX(0%)' : 'translateX(-150%)'};
  position: fixed;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow: auto;
  z-index: 3;
  top: 0;
`

export const IconCircle = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.secondary.light};
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const TagWrapper = styled.div`
  display: flex;
  padding: 0px 3px;
  border: 1px solid ${props => props.theme.colors.gray4};
  border-radius: 3px;
  margin-left: 15px;
`

export const WhiteText = styled.p`
  color: ${props => (props.color ? props.color : props.theme.colors.white)};
  font-size: ${props => (props.size ? `${props.size}px` : '20px')};
  font-weight: 300;
  text-align: center;
  line-height: 39px;
`
export const BlueText = styled(NavLink)`
  color: ${props => props.theme.colors.blue4};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-align: center;
  text-transform: uppercase;
  line-height: 21px;
  cursor: pointer;
`
export const TagText = styled.p`
  color: ${props => (props.color ? props.color : props.theme.colors.white)};
  line-height: 15px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
`
export const CloseIcon = styled(ConquistaIcon).attrs({ name: 'close' })`
  fill: ${props => props.theme.colors.white};
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

export const MenuHeader = styled.div`
  background-color: ${props => props.theme.colors.gray6};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
`

export const ProfileWrapper = styled.div`
  ${defaultWrapper}
`

export const MenuItensWrapper = styled.div`
  ${defaultWrapper}
`

const MenuItemProps = css`
  align-items: center;
  cursor: pointer;
  display: flex;
  min-height: 50px;
  padding: 10px 0 0;
  width: 100%;

  &:hover p {
    color: ${props => props.theme.colors.blue4};
  }
`

export const MenuItem = styled(NavLink)`
  ${MenuItemProps}
  ${props => props.disabled && disabled}
`

export const MenuItemExpand = styled.div`
  display: flex;
  padding: 10px 0 0;
  flex-direction: column;
  width: 100%;
`

export const MenuItemExpandLabel = styled.div`
  ${MenuItemProps}
  padding-top: 0;
  ${IconCircle} {
    margin-left: auto;
  }
`

export const ContainerDropdown = styled.div`
  max-height: ${props => (props.isOpen ? '1000px' : '0px')};
  transition: all 0.3s linear;
  overflow: hidden;
  width: 100%;
`
export const ItemContainerDropdown = styled.div`
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 35px;
  width: 100%;

  ${MenuItem} {
    padding: 5px 0;

    &:last-of-type {
      padding: 5px 0 0;
    }
  }
`

export const BottomWrapper = styled.div`
  padding: 15px;
`
