import React, { useContext, useState } from 'react'
import { ThemeContext } from 'styled-components'
import 'styled-components/macro'

import { uuid } from 'uuidv4'

import Button from 'components/Button'
import ButtonIcon from 'components/Button/Icon'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'

import { Currency } from 'helpers/money'
import { FullHeightCard } from 'pages/Objectives/Recommendation/styles'
import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { IFunds } from 'store/modules/Objective/types'

import { FormatValue } from '../utils'
import { IMobileProps, IEditCards } from './types'
import * as s from './styles'

const EditableCards = ({
  fund,
  onBlurAction,
  removeAction,
  recalculateAction,
}: IEditCards) => {
  const theme = useContext(ThemeContext)
  const [isExpanded, setExpanded] = useState(false)
  const [initialValue, setInitialValue] = useState(fund.initial_value)
  const [monthlyValue, setMonthlyValue] = useState(fund.monthly_value)

  const handleOnChange = (
    value: number,
    type: 'initial_value' | 'monthly_value'
  ) => {
    type === 'initial_value' ? setInitialValue(value) : setMonthlyValue(value)
  }

  return (
    <FullHeightCard
      key={uuid()}
      headerTitle={fund.name}
      headerEndItem={
        <ButtonIcon
          icon={isExpanded ? 'arrowup' : 'arrowdown'}
          onClick={() => setExpanded(expanded => !expanded)}
        />
      }
      footer={
        isExpanded ? (
          <s.ButtonsWrapper>
            <s.RemoveFundButton
              outline
              onClick={() => removeAction(fund.fund_id)}
            >
              Remover fundo
            </s.RemoveFundButton>
            <Button
              onClick={() =>
                recalculateAction(initialValue, monthlyValue, fund)
              }
            >
              Recalcular resultados
            </Button>
          </s.ButtonsWrapper>
        ) : null
      }
      css={`
        margin-top: ${theme.spacing(1)}px;
      `}
    >
      <RiskColorTag borderRisk={fund.order_profile_risk} />

      <div
        css={`
          padding: ${theme.spacing(2)}px 0;
        `}
      >
        <HorizontalList
          size="medium"
          startItems={[<Text color="gray5">Inv. Inicial</Text>]}
          endItems={[
            isExpanded ? (
              <FormatValue
                type="initial_value"
                row={fund}
                onBlur={onBlurAction}
                handleOnChange={handleOnChange}
              />
            ) : (
              <Text type="title" color="gray6" bold>
                {Currency.parse(fund.initial_value, true)}
              </Text>
            ),
          ]}
          css={`
            margin-bottom: ${theme.spacing(1)}px;
          `}
        />
        <HorizontalList
          size="medium"
          startItems={[<Text color="gray5">Inv. Mensal</Text>]}
          endItems={[
            isExpanded ? (
              <FormatValue
                type="monthly_value"
                row={fund}
                onBlur={onBlurAction}
              />
            ) : (
              <Text type="title" color="gray6" bold>
                {Currency.parse(fund.monthly_value, true)}
              </Text>
            ),
          ]}
        />
      </div>
    </FullHeightCard>
  )
}

const MobileCards = ({ funds, recalculateAction, ...rest }: IMobileProps) => (
  <s.Container>
    {funds.map((fund: IFunds) => (
      <EditableCards
        fund={fund}
        recalculateAction={recalculateAction}
        {...rest}
      />
    ))}
  </s.Container>
)

export default MobileCards
