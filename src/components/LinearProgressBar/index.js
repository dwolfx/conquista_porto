import React from 'react'
import PropTypes from 'prop-types'

import { Container, Subtitle } from './styles'

export default function LinearProgressBar({
  width,
  margin,
  now,
  max,
  min,
  subtitle,
}) {
  return (
    <Container
      width={width}
      margin={margin}
      now={now}
      max={max}
      progress={`${(now * 100) / max}%`}
    >
      <div>
        <span>{Math.floor((now * 100) / max)}%</span>
      </div>
      <div>
        <span>{min}</span>
        <span>
          {max} <Subtitle>{subtitle}</Subtitle>
        </span>
      </div>
    </Container>
  )
}

LinearProgressBar.defaultProps = {
  width: '',
  margin: '',
  subtitle: '',
  min: 0,
}

LinearProgressBar.propTypes = {
  width: PropTypes.string,
  margin: PropTypes.string,
  subtitle: PropTypes.string,
  now: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired, // deve ser maior que o valor MIN e maior ou igual que o valor NOW
  min: PropTypes.number,
}
