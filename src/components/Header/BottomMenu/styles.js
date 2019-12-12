import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import DropdownComponent from 'components/Dropdown'
import { Container as DropdownContainer } from 'components/Dropdown/styles'
import ConquistaIcon from 'components/IconExporter'

const paddingMenu = '15px'

export const ArrowUpDownIcon = styled(ConquistaIcon)`
  height: 20px;
  width: 15px;
  margin-right: 0px;
  margin-left: 10px;
`

export const BasicIcon = styled(ConquistaIcon)`
  height: 20px;
  width: 20px;
  fill: ${props => props.theme.colors.gray6};
  margin-right: 10px;
`

export const BottomMenuDropdownIcon = styled(ConquistaIcon)`
  height: 18px;
  width: 18px;
  fill: ${props => props.theme.colors.white};
`

export const ArrowRightIcon = styled(ConquistaIcon).attrs({
  name: 'arrowright',
})`
  height: ${props => (props.size ? `${props.size}px` : '16px')};
  width: ${props => (props.size ? `${props.size}px` : '16px')};
  fill: ${props => props.theme.colors.blue4};
  margin-right: 0px;
`

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
  background-color: ${props => props.theme.colors.white};
  align-items: center;
  justify-content: space-around;
  padding: ${paddingMenu};
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
  color: ${props => props.theme.colors.gray6};
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

  &:hover p {
    color: ${props => props.theme.colors.blue4};
  }
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
const menuItemProps = css`
  display: flex;
  align-items: center;
  cursor: pointer;

  &&:hover {
    svg {
      transition: all 0.2s ease-in-out;
      fill: ${props => props.theme.colors.blue4};
    }
    p {
      transition: all 0.2s ease-in-out;
      color: ${props => props.theme.colors.blue4};
    }
  }
`

export const MenuItem = styled(Link)`
  ${menuItemProps}
`

export const MenuLabelDropdown = styled.div`
  ${menuItemProps}
`

export const WrapperBottomMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;

  &&:hover {
    svg {
      transition: all 0.2s ease-in-out;
      fill: ${props => props.theme.colors.blue4};
    }
    p {
      transition: all 0.2s ease-in-out;
      color: ${props => props.theme.colors.blue4};
    }
  }
`

export const Dropdown = styled(DropdownComponent)`
  ${DropdownContainer} {
    margin-top: ${paddingMenu};
  }
`
