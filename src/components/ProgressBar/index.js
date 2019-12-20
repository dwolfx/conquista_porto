import React from 'react'
import PropTypes from 'prop-types'

import { ProgressBarWrapper, Progress } from './styles'

export default function ProgressBar({ progress, ...rest }) {
  return (
    <ProgressBarWrapper {...rest}>
      <Progress progress={progress} />
    </ProgressBarWrapper>
  )
}

ProgressBar.defaultProps = {
  progress: 0,
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
}
