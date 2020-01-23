import React from 'react'
import PropTypes from 'prop-types'

import { InputWrapper, InputLabel, InputText } from './styles'

const Text = ({ label, width }) => (
  <InputWrapper width={width}>
    {label && <InputLabel>{label}</InputLabel>}
    <InputText></InputText>
  </InputWrapper>
)

Text.propTypes = {
  label: PropTypes.string,
  width: PropTypes.string,
}

Text.defaultProps = {
  label: '',
  width: '100%',
}

export default Text
