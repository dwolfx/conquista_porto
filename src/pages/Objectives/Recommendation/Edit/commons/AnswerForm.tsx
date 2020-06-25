import React, { useEffect, useState } from 'react'
import 'styled-components/macro'

import Icon from 'components/IconExporter'
import Text from 'components/Text'

import { formatMoneyDecimal, formatMoney } from 'helpers'
import { IAnswer } from 'store/modules/Objective/types'

import {
  ValidateInitialInvestment,
  ValidateMonthlyInvestment,
  ValidateNickname,
  ValidateTargetDate,
  ValidateTargetValue,
} from './validations'

import * as s from './styles'

interface IProps {
  values: Omit<IAnswer, 'uf' | 'goal_type'>
  updateValues: (newValue: Omit<IAnswer, 'uf' | 'goal_type'>) => void
  setHasError?: (state: boolean) => void
  colSizes?: { [key in 'xl' | 'lg' | 'md' | 'sm' | 'xs']?: number }
}

export default function AnswerForm({
  values,
  updateValues,
  setHasError,
  colSizes = {},
}: IProps) {
  useEffect(() => {
    if (setHasError) {
      setHasError(
        // !ValidateNickname(values.nickname)[0] ||
        !ValidateTargetDate(values!.target_date)[0] ||
          !ValidateTargetValue(values!.target_value)[0] ||
          !ValidateInitialInvestment(values!.initial_value)[0] ||
          !ValidateMonthlyInvestment(values!.monthly_value)[0]
      )
    }
  }, [values, setHasError])

  const moneyMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const strippedValue = event.target.value.replace(/\D/g, '')

    event.target.value = formatMoneyDecimal(strippedValue)
      .replace(/\./g, '')
      .replace(',', '.') // eslint-disable-line no-param-reassign
  }

  const formatDateMask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const strippedValue = event.target.value.replace(/\D/g, '')
    let newValue = strippedValue
    if (strippedValue.length < 5) {
      newValue = strippedValue.replace(/(\d{2})(\d{1})/g, '$1/$2')
    } else {
      newValue = strippedValue.replace(/(\d{2})(\d{2})(\d{1})/g, '$1/$2/$3')
    }
    // eslint-disable-next-line no-param-reassign
    event.target.value = newValue
  }

  const renderErrorMessage = (message: string) => (
    <s.ErrorMessageContainer>
      <Icon name="information" color="magenta2" width={21} />
      <Text type="body" color="magenta2">
        {message}
      </Text>
    </s.ErrorMessageContainer>
  )

  const handleSingleValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    let { value }: { value: string | number } = event.target

    if (
      name === 'initial_value' ||
      name === 'monthly_value' ||
      name === 'target_value'
    ) {
      moneyMask(event)
      value = +event.target.value
    }
    if (name === 'target_date') {
      formatDateMask(event)
      value = event.target.value
    }

    updateValues({
      ...values,
      [name]: value,
    })
  }

  const [inputCounter, setInputCounter] = useState<number>(0)

  useEffect(() => {
    if (values.nickname) setInputCounter(values.nickname.length)
  }, [values.nickname])

  return (
    <s.FormWrapper
      data-gtm-type="form"
      data-gtm-name="resumo"
      hasCustomColSize={!!Object.values(colSizes).length}
    >
      <s.ColInput error={!ValidateNickname(values.nickname)[0]} {...colSizes}>
        <s.Input
          data-gtm-form="input"
          data-gtm-name="apelido"
          name="nickname"
          maxLength={20}
          error={!ValidateNickname(values.nickname)[0]}
          label="Apelido"
          onChange={handleSingleValue}
          value={values!.nickname}
          suffix={<>{inputCounter}/20</>}
        />

        {!ValidateNickname(values.nickname)[0] &&
          renderErrorMessage(ValidateNickname(values.nickname)[1]?.toString())}
      </s.ColInput>

      <s.ColInput
        error={!ValidateTargetDate(values!.target_date)[0]}
        {...colSizes}
      >
        <s.Input
          data-gtm-form="input"
          data-gtm-name="data-alvo"
          name="target_date"
          error={!ValidateTargetDate(values!.target_date)[0]}
          label="Data alvo"
          onChange={handleSingleValue}
          value={values!.target_date}
          maxLength={10}
        />

        {!ValidateTargetDate(values!.target_date)[0] &&
          renderErrorMessage(
            ValidateTargetDate(values!.target_date)[1]?.toString()
          )}
      </s.ColInput>

      <s.ColInput
        error={!ValidateTargetValue(values!.target_value)[0]}
        {...colSizes}
      >
        <s.Input
          data-gtm-form="input"
          data-gtm-name="meta financeira"
          name="target_value"
          error={!ValidateTargetValue(values!.target_value)[0]}
          prefix="R$"
          label="Meta financeira"
          onChange={handleSingleValue}
          value={formatMoney(values!.target_value, { style: 'decimal' })}
          maxLength={14}
        />

        {!ValidateTargetValue(values!.target_value)[0] &&
          renderErrorMessage(
            ValidateTargetValue(values!.target_value)[1]?.toString()
          )}
      </s.ColInput>

      <s.ColInput
        error={!ValidateInitialInvestment(values!.initial_value)[0]}
        {...colSizes}
      >
        <s.Input
          data-gtm-form="input"
          data-gtm-name="investimento inicial"
          name="initial_value"
          error={!ValidateInitialInvestment(values!.initial_value)[0]}
          prefix="R$"
          label="Investimento inicial"
          onChange={handleSingleValue}
          value={formatMoney(values!.initial_value, { style: 'decimal' })}
          maxLength={14}
        />

        {!ValidateInitialInvestment(values!.initial_value)[0] &&
          renderErrorMessage(
            ValidateInitialInvestment(values!.initial_value)[1]?.toString()
          )}
      </s.ColInput>

      <s.ColInput
        error={!ValidateMonthlyInvestment(values!.monthly_value)[0]}
        {...colSizes}
      >
        <s.Input
          data-gtm-form="input"
          data-gtm-name="investimento mensal"
          name="monthly_value"
          error={!ValidateMonthlyInvestment(values!.monthly_value)[0]}
          prefix="R$"
          label="Investimento mensal"
          onChange={handleSingleValue}
          value={formatMoney(values!.monthly_value, { style: 'decimal' })}
          maxLength={14}
        />

        {!ValidateMonthlyInvestment(values!.monthly_value)[0] &&
          renderErrorMessage(
            ValidateMonthlyInvestment(values!.monthly_value)[1]?.toString()
          )}
      </s.ColInput>
    </s.FormWrapper>
  )
}
