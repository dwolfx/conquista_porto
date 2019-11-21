/* eslint-disable react/no-array-index-key */
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
    items.map(
      ({ color, title, icon, uppercase, iconColor, onItemClick }, index) => (
        <SidebarItem
          backgroundColor="#fff"
          key={`sidebar-item-${index}`}
          onClick={onItemClick}
        >
          <SidebarItemText color={color} uppercase={uppercase}>
            {title}
            {icon && (
              <IconWrapper>
                <Icon name={icon} fill={iconColor} width={12} />
              </IconWrapper>
            )}
          </SidebarItemText>
        </SidebarItem>
      )
    )

  const renderSection = sections =>
    sections &&
    sections.map((section, index) => (
      <SidebarSection key={`sidebar-section-${index}`}>
        {renderItems(section.items)}
      </SidebarSection>
    ))

  return <Sidebar>{renderSection(sidebarItems)}</Sidebar>
}
