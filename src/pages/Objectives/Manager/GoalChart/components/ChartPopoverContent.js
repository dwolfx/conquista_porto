import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Text from 'components/Text'
import IconExporter from 'components/IconExporter'

import moment from 'moment'
import { formatMoney } from 'helpers'

import { DepositTextValue } from '../styles'

export default function ChartPopoverContent({ info, data }) {
  function isFutureDateBasedOnMonth(date) {
    return moment(date).isAfter(moment(), 'month')
  }

  const UNDER_GOAL = 'UNDER_GOAL'
  const ABOVE_GOAL = 'ABOVE_GOAL'

  let informationMessage

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
        <div
          css={`
            display: flex;
            margin-bottom: 14px;
          `}
        >
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
        </div>
      )
    }
    return null
  }

  return (
    <div>
      {renderTopMessage()}
      <Text color="gray5">Saldo total: {formatMoney(info.total_balance)}</Text>
      {!isFutureDateBasedOnMonth(currentDate) && (
        <Text color="gray5">
          Saldo projetado: {formatMoney(info.projected_balance)}
        </Text>
      )}
      <Text color="gray5">
        Investimento mensal esperado: {formatMoney(info.expected_deposit)}
      </Text>
      {!isFutureDateBasedOnMonth(currentDate) && (
        <Text color="gray5">
          Investimento realizado:{' '}
          <DepositTextValue>{formatMoney(info.deposit)}</DepositTextValue>
        </Text>
      )}
    </div>
  )
}

ChartPopoverContent.propTypes = {
  info: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}
