import React from 'react'
import Proptypes from 'prop-types'
import { TabsWrapper, Tabs } from './styles'

export default function TableTabs({ options, onClick, selectedTab }) {
  return (
    <TabsWrapper>
      {options.map(fundType => (
        <Tabs
          key={fundType.value}
          onClick={() => onClick(fundType.value)}
          className={selectedTab === fundType.value && 'active'}
        >
          {fundType.name}
        </Tabs>
      ))}
    </TabsWrapper>
  )
}

TableTabs.propTypes = {
  options: Proptypes.array.isRequired,
  selectedTab: Proptypes.oneOfType([Proptypes.string, Proptypes.number])
    .isRequired,
  onClick: Proptypes.func.isRequired,
}
