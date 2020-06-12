import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react'

import { dict } from 'components/IconExporter'
import { themeColors } from 'styles/theme'
import { PanelTabs, PanelList, PanelTab, SingleTab, Icon } from './styles'

interface TabContextData {
  activeTab: string
  changeTab(name: string): void
}

const TabContext = createContext<TabContextData>({} as TabContextData)

interface TabsProps {
  name?: string
  initialValue?: string
  initialReset: boolean
  children: ReactNode[]
}

export const Tabs: React.FC<TabsProps> = ({
  name,
  initialValue = '',
  initialReset = false,
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

export const TabList: React.FC = ({ children, ...restProps }) => (
  <PanelList {...restProps}>{children}</PanelList>
)

interface TabPanelProps {
  name: string
  children: ReactNode
}

export const TabPanel: React.FC<TabPanelProps> = ({
  name,
  children,
  ...restProps
}) => {
  const tabContext = useContext(TabContext)

  return tabContext.activeTab === name ? (
    <PanelTab {...restProps}>{children}</PanelTab>
  ) : null
}

interface TabProps {
  name: string
  className?: string
  children: string
  onClick?: (event: React.SyntheticEvent) => void
  icon?: {
    name: keyof typeof dict
    color: keyof typeof themeColors
  }
}

export const Tab: React.FC<TabProps> = ({
  name,
  className = '',
  onClick,
  children,
  icon,
  ...restProps
}) => {
  const tabContext = useContext(TabContext)
  const classNames = `${tabContext.activeTab === name ? 'active' : ''}`

  const handleClick = (event: React.SyntheticEvent) => {
    tabContext.changeTab(name)
    onClick && onClick(event)
  }

  return (
    <SingleTab className={classNames} onClick={handleClick} {...restProps}>
      {children || (icon && <Icon name={icon.name} color={icon.color} />)}
    </SingleTab>
  )
}
