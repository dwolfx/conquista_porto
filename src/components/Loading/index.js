import React from 'react'
import PropTypes from 'prop-types'

import Icon from 'components/IconExporter'

export default function Loading({ color, width, type, ...rest }) {
  return <Icon name="spinner" color={color} width={width} {...rest} />
}

Loading.defaultProps = {
  color: 'blue4',
  type: 'circular',
  width: 28,
}

Loading.propTypes = {
  color: PropTypes.string,
  type: PropTypes.oneOf(['circular', 'line']),
  width: PropTypes.number,
}
