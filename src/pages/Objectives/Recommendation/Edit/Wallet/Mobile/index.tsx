import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import { uuid } from 'uuidv4'

import Button from 'components/Button'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import { FullHeightCard } from 'pages/Objectives/Recommendation/styles'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { IFunds } from 'store/modules/Objective/types'

import { FormatValue } from '../utils'
import { IMobileProps } from './types'
import * as s from './styles'

const MobileCards = ({ funds, onChangeAction, removeAction }: IMobileProps) => {
  const theme = useContext(ThemeContext)

  return (
    <s.Container>
      {funds.map((fund: IFunds) => (
        <FullHeightCard
          key={uuid()}
          headerTitle={fund.name}
          footer={
            <Button outline onClick={() => removeAction(fund.fund_id)}>
              Remover fundo
            </Button>
          }
          css={`
            margin-top: ${theme.spacing(1)}px;
          `}
        >
          <RiskColorTag borderRisk={fund.share_holder_profile_risk} />

          <div
            css={`
              padding: ${theme.spacing(2)}px 0;
            `}
          >
            <HorizontalList
              size="small"
              startItems={[<Text color="gray5">Inv. Inicial</Text>]}
              endItems={[
                <FormatValue
                  type="initial_value"
                  row={fund}
                  onChange={onChangeAction}
                />,
              ]}
            />
            <HorizontalList
              size="small"
              startItems={[<Text color="gray5">Inv. Mensal</Text>]}
              endItems={[
                <FormatValue
                  type="monthly_value"
                  row={fund}
                  onChange={onChangeAction}
                />,
              ]}
            />
          </div>
        </FullHeightCard>
      ))}
    </s.Container>
  )
}

export default MobileCards
