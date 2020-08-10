import React from 'react'
import 'styled-components/macro'

import Button from 'components/Button'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import { formatMoney } from 'helpers'

import { FullHeightCard } from 'pages/Objectives/Recommendation/styles'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { IFund } from 'pages/Objectives/Recommendation/types'

interface IProps {
  cardHeader: React.JSXElementConstructor<object>
  cardInfos: React.JSXElementConstructor<object>
  funds: IFund[]
  handleOpenDetails: (fund: IFund) => void
}

const CardsView = ({
  cardHeader: CardHeader,
  cardInfos: CardInfos,
  funds,
  handleOpenDetails,
}: IProps) => {
  const renderFundsCards = () =>
    funds.map((fund: IFund) => (
      <FullHeightCard
        headerTitle={fund.name}
        footer={
          <Button
            outline
            onClick={() => handleOpenDetails(fund)}
            css={`
              width: 100%;
            `}
          >
            mais informações
          </Button>
        }
        css={`
          margin-top: 14px;
        `}
      >
        <RiskColorTag borderRisk={fund.share_holder_profile_risk} />

        <HorizontalList
          startItems={[<Text color="gray5">Rent. últ 12 meses</Text>]}
          endItems={[
            <Text color="gray6" bold>
              {fund.profitability &&
              fund.profitability[0] &&
              fund.profitability[0].value &&
              fund.profitability[0].value[3]
                ? `${fund.profitability[0].value[3]}%`
                : '-'}
            </Text>,
          ]}
        />
        <HorizontalList
          startItems={[<Text color="gray5">Inv. Inicial</Text>]}
          endItems={[
            <Text color="gray6" bold>
              {formatMoney(fund.initial_value)}
            </Text>,
          ]}
        />
        <HorizontalList
          startItems={[<Text color="gray5">Inv. Mensal</Text>]}
          endItems={[
            <Text color="gray6" bold>
              {formatMoney(fund.monthly_value)}
            </Text>,
          ]}
        />
      </FullHeightCard>
    ))

  return (
    <>
      <FullHeightCard headerIcon="financial" headerTitle={<CardHeader />}>
        <CardInfos />
      </FullHeightCard>

      {renderFundsCards()}
    </>
  )
}

export default CardsView
