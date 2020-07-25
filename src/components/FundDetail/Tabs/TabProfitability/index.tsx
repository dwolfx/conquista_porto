import React from 'react'
import 'styled-components/macro'
import Text from 'components/Text'


import HorizontalList from 'components/HorizontalList'
import { StyledIcon } from 'pages/Investments/FundsList/styles'
import useMedia from 'hooks/useMedia'

import Tablet from './Tablet'
import Desktop from './Desktop'
import { IFundProps } from '../../types'

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
        <Tablet
          histRentabilBenchmark={histRentabilBenchmark}
          histRentabilFundo={histRentabilFundo}
        />
      ) : (
        <Desktop
          histRentabilBenchmark={histRentabilBenchmark}
          histRentabilFundo={histRentabilFundo}
        />
      )}
    </ProfitabilityContent>
  )
}
