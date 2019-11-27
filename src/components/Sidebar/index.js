/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarItemText,
  IconWrapper,
  Wrapper,
} from './styles'

const SidebarComponent = ({ sidebarItems }) => {
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

  return (
    <Sidebar>
      <Wrapper>{renderSection(sidebarItems)}</Wrapper>
    </Sidebar>
  )
}

SidebarComponent.defaultProps = {
  sidebarItems: [],
}

SidebarComponent.propTypes = {
  sidebarItems: PropTypes.arrayOf(
    PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          icon: PropTypes.string,
          iconColor: PropTypes.string,
          onItemClick: PropTypes.func,
        })
      ),
    })
  ),
}

export default SidebarComponent
