import React from 'react'
import Icon from '../IconExporter'
import {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarItemText,
  IconWrapper,
} from './styles'

export default ({ sidebarItems }) => {
  const renderItems = items =>
    items &&
    items.map(({ color, title, icon, uppercase, iconColor }) => (
      <SidebarItem backgroundColor="#fff">
        <SidebarItemText color={color} uppercase={uppercase}>
          {title}
          {icon && (
            <IconWrapper>
              <Icon name={icon} fill={iconColor} width={12} />
            </IconWrapper>
          )}
        </SidebarItemText>
      </SidebarItem>
    ))

  const renderSection = sections =>
    sections &&
    sections.map(section => (
      <SidebarSection>{renderItems(section.items)}</SidebarSection>
    ))

  return <Sidebar>{renderSection(sidebarItems)}</Sidebar>
}
