import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

import {
  ComponentContainer,
  LoadingContainer,
  LoadingBar,
  LegendText,
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
    return <Icon name="spinner" color={color} width={width} {...rest} />
  }

  return (
    <ComponentContainer>
      {legend && placement === 'top' && (
        <LegendText type="headline" color="gray5" placement={placement}>
          {legend}
        </LegendText>
      )}
      <LoadingContainer>
        <LoadingBar color={color} />
      </LoadingContainer>
      {legend && placement === 'bottom' && (
        <LegendText type="headline" color="gray5" placement={placement}>
          {legend}
        </LegendText>
      )}
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
