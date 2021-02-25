import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import { uuid } from 'uuidv4'

import Button from 'components/Button'
import Text from 'components/Text'
import HorizontalList from 'components/HorizontalList'
import { formatMoney } from 'helpers'

import { FullHeightCard } from 'pages/Objectives/Recommendation/styles'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { IFunds } from 'store/modules/Objective/types'

interface IProps {
  cardHeader: React.JSXElementConstructor<object>
  cardInfos: React.JSXElementConstructor<object>
  funds: IFunds[]
  handleOpenDetails: (fund: IFunds) => void
  totalInitialInvestment: number
  totalMontlyInvestment: number
  setEditingWallet: (state: boolean) => void
}

const CardsView = ({
  cardHeader: CardHeader,
  cardInfos: CardInfos,
  funds,
  handleOpenDetails,
  totalInitialInvestment,
  totalMontlyInvestment,
  setEditingWallet,
}: IProps) => {
  const theme = useContext(ThemeContext)

  const renderFundsCards = () =>
    funds.map((fund: IFunds) => (
      <FullHeightCard
        key={uuid()}
        headerTitle={fund.name}
        footer={
          <div
            css={`
              padding: 0 ${theme.spacing(1.5)}px;
              width: 100%;
            `}
          >
            <Button
              outline
              onClick={() => handleOpenDetails(fund)}
              css={`
                width: 100%;
              `}
            >
              mais informações
            </Button>
          </div>
        }
        css={`
          margin-top: ${theme.spacing(2)}px;
        `}
      >
        <RiskColorTag borderRisk={fund.order_profile_risk} />

        <div
          css={`
            padding: ${theme.spacing(2)}px 0;
          `}
        >
          <HorizontalList
            size="small"
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
            size="small"
            startItems={[<Text color="gray5">Inv. Inicial</Text>]}
            endItems={[
              <Text color="gray6" bold>
                {formatMoney(fund.initial_value)}
              </Text>,
            ]}
          />
          <HorizontalList
            size="small"
            startItems={[<Text color="gray5">Inv. Mensal</Text>]}
            endItems={[
              <Text color="gray6" bold>
                {formatMoney(fund.monthly_value)}
              </Text>,
            ]}
          />
        </div>
      </FullHeightCard>
    ))

  return (
    <>
      <FullHeightCard headerIcon="financial" headerTitle={<CardHeader />}>
        <CardInfos />

        <div
          css={`
            padding: 0 ${theme.spacing(2)}px;
            width: 100%;
          `}
        >
          <Button
            outline
            onClick={() => setEditingWallet(true)}
            css={`
              margin-bottom: ${theme.spacing(1.5)}px;
              width: 100%;
            `}
          >
            Editar composição
          </Button>
        </div>
      </FullHeightCard>

      {renderFundsCards()}

      <FullHeightCard
        css={`
          margin-top: ${theme.spacing(2)}px;
          padding: ${theme.spacing(2)}px ${theme.spacing(1)}px;
        `}
      >
        <HorizontalList
          size="medium"
          startItems={[
            <Text type="captionUppercase" color="gray5">
              Total Inv. Inicial
            </Text>,
          ]}
          endItems={[
            <Text color="gray6" bold textAlign="center">
              {formatMoney(totalInitialInvestment)}
            </Text>,
          ]}
        />
        <HorizontalList
          size="medium"
          startItems={[
            <Text type="captionUppercase" color="gray5">
              Total Inv. Mensal
            </Text>,
          ]}
          endItems={[
            <Text color="gray6" bold textAlign="center">
              {formatMoney(totalMontlyInvestment)}
            </Text>,
          ]}
        />
      </FullHeightCard>
    </>
  )
}

export default CardsView
