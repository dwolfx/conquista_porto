import React from 'react'
import PropTypes from 'prop-types'

import { InputText } from './styles'

const Text = ({ width, ...rest }) => <InputText width={width} {...rest} />

Text.propTypes = {
  width: PropTypes.string,
}

Text.defaultProps = {
  width: '100%',
}

export default Text
