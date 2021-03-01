import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import 'styled-components/macro'

import ButtonIcon from 'components/Button/Icon'
import Popover from 'components/Popover'
import Text from 'components/Text'

import { BRLCurrency, Currency, errors } from 'helpers/money'
import UnexpectedTextException from 'helpers/errors/UnexpectedTextException'
import { useToast } from 'hooks/toast'

import { RiskColorTag } from 'pages/Objectives/Recommendation/WalletSection/styles'
import { IFunds } from 'store/modules/Objective/types'

import { IHandleInputsBlur, IHandleInputsChange } from './types'
import * as s from './styles'

export const formatFundoInv = (row: IFunds) => (
  <s.FundoOutterWrapper key={`fund_name_${row.fund_id}`}>
    <RiskColorTag borderRisk={row.order_profile_risk} />
    <s.FundoWrapper>
      <s.FundoNameWrapper color="gray5">{row.name}</s.FundoNameWrapper>
      <Text type="caption" color="gray4" bold textAlign="left">
        {row.arena_category}
      </Text>
    </s.FundoWrapper>
  </s.FundoOutterWrapper>
)

interface IFormatValue {
  row: IFunds
  onBlur: ({ row, event, value }: IHandleInputsBlur) => void
  type: 'initial_value' | 'monthly_value'
  onChange?: ({ row, inputedValue }: IHandleInputsChange) => void
}

export const FormatValue = ({ row, onBlur, onChange, type }: IFormatValue) => {
  const { addToast } = useToast()
  const minValue = getMinFundValue(type)

  const [innerValue, setInnerValue] = useState(row[type])
  const [compareError, setCompareError] = useState(false)

  const { isLoadingRelculateFundsData } = useSelector<any, any>(
    state => state.objective
  )

  useEffect(() => {
    if (type === 'monthly_value') {
      setCompareError(innerValue !== 0 && innerValue < minValue)
    } else {
      setCompareError(innerValue < minValue)
    }
  }, [innerValue, minValue, type])

  function getMinFundValue(moneyInputName: string): number {
    let minFundValue: number
    switch (moneyInputName) {
      case 'initial_value':
        minFundValue = row.min_initial_value
        break
      case 'monthly_value':
        minFundValue = row.min_value_to_invest
        break
      default:
        throw new UnexpectedTextException(
          'MoneyInput name attribute',
          ['initial_value', 'monthly_value'],
          moneyInputName
        )
    }
    return minFundValue
  }

  function minFundValueValidation(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const innerFundCurrency = new BRLCurrency(event.target.value)
      const minFundCurrency = new BRLCurrency(Currency.parse(minValue))

      setInnerValue(
        innerFundCurrency.mustBeGreaterThen(minFundCurrency).toNumber()
      )
      setCompareError(false)
    } catch (error) {
      switch (error.constructor) {
        case errors.ValidationCurrencyException:
          addToast({
            type: 'error',
            title: 'Erro de validação',
            description: 'o valor digitado não é válido.',
          })
          console.error(error)
          break
        case errors.CompareCurrencyException:
          const currency = new BRLCurrency(event.target.value)
          const isZero = currency.toNumber() === 0
          setCompareError(type === 'monthly_value' ? !isZero : true)
          setInnerValue(currency.toNumber())
          break
        default:
          addToast({
            type: 'error',
            title: 'Erro não esperado',
            description: 'Volte mais tarde ou recarregue a página',
          })
          console.error(error)
      }
    }
  }

  return (
    <Popover
      tooltip
      turnOff={!compareError}
      content={() => (
        <Text type="body" color={'white'}>
          Insira um valor a partir de {Currency.parse(minValue)}, por favor.
        </Text>
      )}
    >
      <s.MoneyInput
        key={`fund_${type}_${row.fund_id}`}
        prefix="R$"
        name={type}
        error={compareError}
        value={Currency.parse(innerValue)}
        maxLength={14}
        disabled={isLoadingRelculateFundsData}
        onFocus={minFundValueValidation}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          minFundValueValidation(event)

          if (onChange) {
            onChange({ row, inputedValue: innerValue, type })
          }
        }}
        onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
          onBlur({
            event,
            row,
            value: innerValue,
            hasError: compareError,
          })
        }}
      />
    </Popover>
  )
}

export const formatActions = (
  row: IFunds,
  removeAction: (fundId: number) => void
) => (
  <ButtonIcon
    icon="close"
    onClick={() => removeAction(row.fund_id)}
    key={`fund_remove_${row.fund_id}`}
  />
)
