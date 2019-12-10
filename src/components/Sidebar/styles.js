import styled from 'styled-components'

import breakpoints from 'styles/breakpoints'

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  flex: 1;

  @media ${breakpoints.mobile} {
    display: none;
  }
`

export const SidebarSection = styled.ul`
  margin-bottom: 10px;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
`

export const SidebarItem = styled.li`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'transparent'};
  border-bottom: 1px solid #c7c7c7;
  cursor: pointer;
  padding: 15px;
  position: relative;

  &:last-of-type {
    border-bottom: none;
  }
`

export const SidebarItemText = styled.a`
  color: ${props => {
    switch (props.color) {
      case 'primary':
        return props.theme.colors.blue4
      default:
        return props.theme.colors.gray6
    }
  }};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
  font-size: ${props => (props.uppercase ? '11px' : '14px')};
`

export const IconWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: calc(50% - 6px);
`

export const Wrapper = styled.div``
