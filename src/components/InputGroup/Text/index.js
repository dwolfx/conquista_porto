import React from 'react'

import { InputWrapper, InputLabel, InputText } from './styles'

const Text = ({ label, width }) => (
  <InputWrapper width={width}>
    {label && <InputLabel>{label}</InputLabel>}
    <InputText></InputText>
  </InputWrapper>
)

export default Text
