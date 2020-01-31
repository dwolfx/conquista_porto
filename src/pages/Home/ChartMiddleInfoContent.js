import React from 'react'
import PropTypes from 'prop-types'

import { formatMoney } from 'helpers'
import { useHistory } from 'react-router-dom'

import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'

import { EmptyBody, PieItemMargin } from './styles'

const ChartEmptyState = ({ value }) => {
  const history = useHistory()
  return (
    <EmptyBody>
      <Text color="gray5" type="captionUppercase">
        Total investido
      </Text>
      <PieItemMargin>
        <Text color="gray5" type="heading4" bold>
          {formatMoney(value)}
        </Text>
      </PieItemMargin>
      <ButtonLink onClick={() => history.push('/investimentos/visualizar')}>
        Gerenciar
      </ButtonLink>
    </EmptyBody>
  )
}

const ChartMiddleInfoContent = ({ pieChartInfo }) => {
  const history = useHistory()
  return validPieChartInfo(pieChartInfo) ? (
    <EmptyBody>
      <Text type="heading4">{`${pieChartInfo.percent}%`}</Text>
      <PieItemMargin>
        <Text color="gray5" type="captionUppercase">
          {pieChartInfo.label}
        </Text>
      </PieItemMargin>
      <Text type="heading4" bold>
        {formatMoney(pieChartInfo.value)}
      </Text>
      <PieItemMargin>
        <ButtonLink onClick={() => history.push('/investimentos/visualizar')}>
          Gerenciar
        </ButtonLink>
      </PieItemMargin>
    </EmptyBody>
  ) : (
    <ChartEmptyState
      value={validPieChartEmptyState(pieChartInfo) ? pieChartInfo.value : 0}
    />
  )
}

const validPieChartInfo = info =>
  info && info.id !== 'emptyvalue' && info.value && info.label

const validPieChartEmptyState = info => info && info.id !== 'emptyvalue'

ChartMiddleInfoContent.propTypes = {
  pieChartInfo: PropTypes.object.isRequired,
}

ChartEmptyState.propTypes = {
  value: PropTypes.number.isRequired,
}

export default ChartMiddleInfoContent
