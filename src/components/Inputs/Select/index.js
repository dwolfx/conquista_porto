/* eslint-disable react/no-array-index-key */
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
  const renderOptions = () =>
    options &&
    options.map((item, index) => (
      <option key={`${props.name}-${index}`} value={item.value || item.name}>
        {item.name}
      </option>
    ))

  return (
    <SelectWrapper
      width={width}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
    >
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectField {...props}>
        <option value="">Selecione</option>
        {renderOptions()}
      </SelectField>
    </SelectWrapper>
  )
}
