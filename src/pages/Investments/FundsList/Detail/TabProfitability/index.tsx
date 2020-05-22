import React from 'react'
import 'styled-components/macro'
import Text from 'components/Text'

import useMedia from 'hooks/useMedia'

import HorizontalList from 'components/HorizontalList'

import { StyledIcon } from 'pages/Investments/FundsList/styles'
import TabletView from './TabletView'
import DesktopView from './DesktopView'
import { IFundProps } from './interfaces'

import { ProfitabilityContent } from './styles'

export default function TabProfitability({ fund }: IFundProps) {
  const isTablet = useMedia('lg')

  const histRentabilBenchmark =
    fund.comparativo_hist_rentabil.hist_rentabil_benchmark
  const histRentabilFundo = fund.comparativo_hist_rentabil.hist_rentabil_fundo

  return (
    <ProfitabilityContent>
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
        <TabletView
          histRentabilBenchmark={histRentabilBenchmark}
          histRentabilFundo={histRentabilFundo}
        />
      ) : (
        <DesktopView
          histRentabilBenchmark={histRentabilBenchmark}
          histRentabilFundo={histRentabilFundo}
        />
      )}
    </ProfitabilityContent>
  )
}
