import React from 'react'
import 'styled-components/macro'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import HorizontalList from 'components/HorizontalList'

import { StyledIcon } from 'pages/Investments/FundsList/styles'
import TabletView from './TabletView'
import DesktopView from './DesktopView'

import { ProfitabilityContent } from './styles'

export interface IProps {
  profitability: {
    name: string
    value: {
      [key: number]: number | undefined
    }
  }[]
}

export const TabProfitability: React.FC<IProps> = ({
  profitability,
  ...rest
}) => {
  const isTablet = useMedia('lg')

  return (
    <ProfitabilityContent {...rest}>
      <HorizontalList
        noPadding
        startItems={[
          <StyledIcon name="linechart" />,
          <Text color="gray6" type="subheading">
            RENTABILIDADE HISTÓRICA
          </Text>,
        ]}
      />
      {isTablet ? (
        <TabletView profitability={profitability} />
      ) : (
        <DesktopView profitability={profitability} />
      )}
    </ProfitabilityContent>
  )
}

export default TabProfitability
