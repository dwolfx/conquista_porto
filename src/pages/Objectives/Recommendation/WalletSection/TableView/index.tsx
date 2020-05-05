import React from 'react'

import { FullHeightCard } from 'pages/Objectives/Recommendation/styles'
import { IFund } from 'pages/Objectives/Recommendation/WalletSection/types'

import { columns, fundsType } from './tableData'
import * as s from './styles'

interface IProps {
  funds: IFund[]
  handleOpenDetails: (fund: IFund) => void
  sectionInfos: React.JSXElementConstructor<object>
}

const DesktopView = ({
  funds,
  handleOpenDetails,
  sectionInfos: SectionInfos,
}: IProps) => (
  <FullHeightCard headerIcon="financial" headerTitle="Composição da Carteira">
    <SectionInfos />

    <s.ContainerFunds>
      <s.Table
        columns={columns}
        onShowDetails={(rowDetails: IFund) => handleOpenDetails(rowDetails)}
        data={funds}
        fundsType={fundsType}
      />
    </s.ContainerFunds>
  </FullHeightCard>
)

export default DesktopView
