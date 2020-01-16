import React from 'react'
import PropTypes from 'prop-types'

import { formatMoney } from 'helpers'
import Text from 'components/Text'
import { EmptyBody, EmptyText } from './styles'

const ChartEmptyState = ({ value }) => (
  <EmptyBody>
    <EmptyText type="captionUppercase">Total investido</EmptyText>
    <EmptyText type="heading4" bold>
      {value ? formatMoney(value) : formatMoney(0)}
    </EmptyText>
  </EmptyBody>
)

const ChartMiddleInfoContent = ({ pieChartInfo }) =>
  pieChartInfo.value && pieChartInfo.label ? (
    <EmptyBody>
      <Text type="heading4">{`${pieChartInfo.percent}%`}</Text>
      <EmptyText type="captionUppercase">{pieChartInfo.label}</EmptyText>
      <Text type="heading4" bold>
        {formatMoney(pieChartInfo.value)}
      </Text>
    </EmptyBody>
  ) : (
    <ChartEmptyState value={pieChartInfo.value} />
  )

ChartMiddleInfoContent.propTypes = {
  pieChartInfo: PropTypes.object.isRequired,
}

ChartEmptyState.propTypes = {
  value: PropTypes.number.isRequired,
}

export default ChartMiddleInfoContent
