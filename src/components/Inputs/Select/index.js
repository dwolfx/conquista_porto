import React from 'react'
import { SelectWrapper, SelectLabel, SelectField } from './styles'

export default ({
  label,
  options,
  width,
  paddingLeft,
  paddingRight,
  ...props
}) => {
  const renderOptions = option =>
    option &&
    option.map(item => <option value={item.value}>{item.name}</option>)

  return (
    <SelectWrapper
      width={width}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
    >
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectField {...props}>
        <option value="">Selecione</option>
        {renderOptions(options)}
      </SelectField>
    </SelectWrapper>
  )
}
