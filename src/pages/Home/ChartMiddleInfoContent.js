import React from 'react'
import PropTypes from 'prop-types'

import { formatMoney } from 'helpers'
import Text from 'components/Text'
import { EmptyBody, EmptyText } from './styles'

const ChartEmptyState = ({ value }) => (
  <EmptyBody>
    <EmptyText type="captionUppercase">Total investido</EmptyText>
    <EmptyText type="heading4" bold>
      {formatMoney(value)}
    </EmptyText>
  </EmptyBody>
)

const ChartMiddleInfoContent = ({ pieChartInfo }) =>
  validPieChartInfo(pieChartInfo) ? (
    <EmptyBody>
      <Text type="heading4">{`${pieChartInfo.percent}%`}</Text>
      <EmptyText type="captionUppercase">{pieChartInfo.label}</EmptyText>
      <Text type="heading4" bold>
        {formatMoney(pieChartInfo.value)}
      </Text>
    </EmptyBody>
  ) : (
    <ChartEmptyState
      value={validPieChartEmptyState(pieChartInfo) ? pieChartInfo.value : 0}
    />
  )

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
