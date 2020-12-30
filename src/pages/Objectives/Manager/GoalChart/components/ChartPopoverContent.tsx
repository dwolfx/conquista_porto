import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import 'styled-components/macro'

import Text from 'components/Text'
import IconExporter from 'components/IconExporter'

import { Currency } from 'helpers/money'

import { DepositTextValue, TopInfoContentPopover } from '../styles'

interface IProps {
  info: {
    deposit: number
    expected_deposit: number
    monthNumber: number
    year: number
    total_balance: number
    projected_balance: number
  }
  data: any
}

export default function ChartPopoverContent({ info, data }: IProps) {
  function isFutureDateBasedOnMonth(date: string) {
    return moment(date).isAfter(moment(), 'month')
  }

  const UNDER_GOAL = 'UNDER_GOAL'
  const ABOVE_GOAL = 'ABOVE_GOAL'

  let informationMessage: 'UNDER_GOAL' | 'ABOVE_GOAL'

  if (info.deposit < info.expected_deposit) {
    informationMessage = UNDER_GOAL
  } else {
    informationMessage = ABOVE_GOAL
  }

  const formattedMonth =
    info.monthNumber < 10 ? `0${info.monthNumber}` : info.monthNumber
  const currentDate = `${info.year}-${formattedMonth}`

  let shouldDisplayMessageOnPopover = false

  if (data.conquered || informationMessage === UNDER_GOAL) {
    shouldDisplayMessageOnPopover = true
  }

  if (!data.conquered && isFutureDateBasedOnMonth(currentDate)) {
    shouldDisplayMessageOnPopover = false
  }

  const renderTopMessage = () => {
    if (shouldDisplayMessageOnPopover) {
      return (
        <TopInfoContentPopover>
          <IconExporter
            name={
              informationMessage === UNDER_GOAL && !data.conquered
                ? 'alertrounded'
                : 'check'
            }
            color={
              informationMessage === UNDER_GOAL && !data.conquered
                ? 'magenta2'
                : 'blue4'
            }
            width="21px"
          />
          <Text
            color="gray5"
            css={`
              padding-left: 7px;
            `}
          >
            {data.conquered
              ? 'Parabéns! Você atingiu seu objetivo.'
              : 'Você está abaixo da meta deste mês.'}
          </Text>
        </TopInfoContentPopover>
      )
    }
    return null
  }

  return (
    <>
      {renderTopMessage()}
      {!isFutureDateBasedOnMonth(currentDate) && (
        <Text color="gray5">
          Saldo total: {Currency.parse(info.total_balance, true)}
        </Text>
      )}

      <Text color="gray5">
        Saldo projetado: {Currency.parse(info.projected_balance, true)}
      </Text>

      <Text color="gray5">
        Investimento mensal esperado:{' '}
        {Currency.parse(info.expected_deposit, true)}
      </Text>
      {!isFutureDateBasedOnMonth(currentDate) && (
        <Text color="gray5">
          Investimento realizado:{' '}
          <DepositTextValue>
            {Currency.parse(info.deposit, true)}
          </DepositTextValue>
        </Text>
      )}
    </>
  )
}

ChartPopoverContent.propTypes = {
  info: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}
