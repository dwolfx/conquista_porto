import React from 'react'
import PropTypes from 'prop-types'

import useMedia from 'hooks/useMedia'
import HorizontalChart from './HorizontalChart'
import VerticalChart from './VerticalChart'

export default function GoalChart({ data, isLoading }) {
  const isMobile = useMedia('sm')

  return isMobile ? (
    <VerticalChart data={data} isLoading={isLoading} isMobile={isMobile} />
  ) : (
    <HorizontalChart data={data} isLoading={isLoading} />
  )
}

GoalChart.propTypes = {
  data: PropTypes.shape({
    total_balance: PropTypes.number,
    years: PropTypes.arrayOf(
      PropTypes.shape({
        month_map: PropTypes.shape({}),
        year: PropTypes.number,
      })
    ),
    conquered: PropTypes.bool,
  }),
  isLoading: PropTypes.bool,
}

GoalChart.defaultProps = {
  data: {
    total_balance: 0,
    years: [],
    conquered: false,
  },
  isLoading: false,
}
