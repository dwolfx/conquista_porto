import React from 'react'
import { useHistory } from 'react-router-dom'
import { formatMoney } from 'helpers'

import Text from 'components/Text'

import * as t from './types'
import * as s from './styles'

const validPieChartInfo = (info: t.IPieChartInfoState) =>
  info && info.id !== 'emptyvalue' && info.value && info.label

const validPieChartEmptyState = (info: t.IPieChartInfoState) =>
  info && info.id !== 'emptyvalue'

const ChartEmptyState = ({ value }: { value: string | number }) => {
  const history = useHistory()

  const linkInvestment =
    value > 0 ? '/investimentos/visualizar' : '/investimentos'

  return (
    <s.EmptyBody>
      <s.PieMiddleContentTitle color="gray5" type="captionUppercase">
        Total Investido
      </s.PieMiddleContentTitle>
      <s.PieItemMargin>
        <Text color="black" type="heading4" bold>
          {formatMoney(value)}
        </Text>
      </s.PieItemMargin>
      <s.ButtonLink
        data-gtm-subname="card investimentos total investido"
        data-gtm-name="gerenciar"
        data-gtm-type="click"
        data-gtm-clicktype="link"
        onClick={() => history.push(linkInvestment)}
      >
        Gerenciar
      </s.ButtonLink>
    </s.EmptyBody>
  )
}

const ChartMiddleInfoContent = ({
  pieChartInfo,
}: {
  pieChartInfo: t.IPieChartInfoState
}) => {
  const history = useHistory()

  return validPieChartInfo(pieChartInfo) ? (
    <s.EmptyBody>
      <Text
        type="heading4"
        color="black"
        bold
      >{`${pieChartInfo.percent}%`}</Text>
      <s.PieItemMargin>
        <Text color="gray5" type="captionUppercase">
          {pieChartInfo.label === 'Renda Variável'
            ? 'Ações'
            : pieChartInfo.label}
        </Text>
      </s.PieItemMargin>
      <Text type="heading4" color="black" bold>
        {formatMoney(pieChartInfo.value)}
      </Text>
      <s.PieItemMargin>
        <s.ButtonLink
          data-gtm-subname="card investimentos total investido"
          data-gtm-name="gerenciar"
          data-gtm-type="click"
          data-gtm-clicktype="link"
          onClick={() => history.push('/investimentos/visualizar')}
        >
          Gerenciar
        </s.ButtonLink>
      </s.PieItemMargin>
    </s.EmptyBody>
  ) : (
    <ChartEmptyState
      value={validPieChartEmptyState(pieChartInfo) ? pieChartInfo.value : 0}
    />
  )
}

export default ChartMiddleInfoContent
