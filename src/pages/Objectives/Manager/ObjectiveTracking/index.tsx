import React from 'react'

import Text from 'components/Text'

import { Currency } from 'helpers/money'

import * as s from './styles'

export interface IObjectiveTracking {
  targetValue: number
  totalBalance: number
}

const ObjectiveTracking = ({
  targetValue,
  totalBalance,
  ...rest
}: IObjectiveTracking) => {
  const moneyNeededToReachObjective: number = targetValue - totalBalance
  const percentage: number = +((totalBalance * 100) / targetValue).toFixed(2)
  const ObjectiveTrackingRender = () => (
    <s.Card>
      <Text type={'captionUppercase'} bold color={'gray5'}>
        Acompanhamento do objetivo
      </Text>
      <s.MiniLinearProgressBar
        current={totalBalance}
        max={targetValue}
        percentage={percentage}
      />
      <Text type={'captionUppercase'} bold color={'gray4'}>
        {`Faltam ${Currency.parse(moneyNeededToReachObjective, true)}`}
      </Text>
    </s.Card>
  )
  return ObjectiveTrackingRender()
}

export default ObjectiveTracking
