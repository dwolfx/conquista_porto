import React, { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import { PanelTabs, PanelList, PanelTab, SingleTab, Icon } from './styles'

const TabContext = createContext()

export const Tabs = ({
  initialValue,
  initialReset,
  children,
  ...restProps
}) => {
  const [activeTab, changeTab] = useState('')

  useEffect(() => {
    if (initialReset) {
      changeTab(initialValue)
    }
  }, [initialReset, initialValue])

  const tabProviderValue = { activeTab, changeTab }

  return (
    <TabContext.Provider value={tabProviderValue}>
      <PanelTabs {...restProps}>{children}</PanelTabs>
    </TabContext.Provider>
  )
}

export const TabList = ({ children, ...restProps }) => (
  <PanelList {...restProps}>{children}</PanelList>
)

export const TabPanel = ({ name, children, ...restProps }) => {
  const tabContext = useContext(TabContext)
  return (
    tabContext.activeTab === name && (
      <PanelTab {...restProps}>{children}</PanelTab>
    )
  )
}

export const Tab = ({
  name,
  className,
  onClick,
  children,
  icon,
  ...restProps
}) => {
  const tabContext = useContext(TabContext)
  const classNames = `${tabContext.activeTab === name ? 'active' : ''}`

  const handleClick = event => {
    tabContext.changeTab(name)
    onClick(event)
  }

  return (
    <SingleTab className={classNames} onClick={handleClick} {...restProps}>
      {children || <Icon name={icon.name} color={icon.color} />}
    </SingleTab>
  )
}

Tabs.propTypes = {
  initialReset: PropTypes.bool,
  initialValue: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
}

Tabs.defaultProps = {
  initialReset: false,
}

TabList.propTypes = {
  children: PropTypes.array.isRequired,
}

TabPanel.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string,
  }),
}

Tab.defaultProps = {
  className: '',
  onClick: () => {},
  icon: null,
}
