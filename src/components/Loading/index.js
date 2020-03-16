import React from 'react'
import PropTypes from 'prop-types'

import {
  ComponentContainer,
  LoadingContainer,
  LoadingBar,
  LegendText,
  IconAnimated,
} from './styles'

export default function Loading({
  color,
  width,
  type,
  legend,
  placement,
  ...rest
}) {
  if (type === 'spinner') {
    return <IconAnimated name="spinner" color={color} width={width} {...rest} />
  }

  return (
    <ComponentContainer>
      {legend && (
        <LegendText type="headline" color="gray5" placement={placement}>
          {legend}
        </LegendText>
      )}
      <LoadingContainer>
        <LoadingBar color={color} />
      </LoadingContainer>
    </ComponentContainer>
  )
}

Loading.defaultProps = {
  color: 'blue4',
  type: 'spinner',
  width: 28,
  legend: '',
  placement: 'top',
}

Loading.propTypes = {
  color: PropTypes.string,
  type: PropTypes.oneOf(['spinner', 'bar']),
  width: PropTypes.number,
  legend: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'bottom']),
}
