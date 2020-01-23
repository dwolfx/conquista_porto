import React from 'react'
import PropTypes from 'prop-types'

import { InputWrapper, InputText } from './styles'

const Text = ({ width }) => (
  <InputWrapper width={width}>
    <InputText></InputText>
  </InputWrapper>
)

Text.propTypes = {
  width: PropTypes.string,
}

Text.defaultProps = {
  width: '100%',
}

export default Text
