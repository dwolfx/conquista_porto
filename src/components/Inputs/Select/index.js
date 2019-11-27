/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

import {
  SelectWrapper,
  SelectLabel,
  SelectField,
  SelectFieldWrapper,
} from './styles'

const SelectComponent = ({
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
      <SelectFieldWrapper>
        <SelectField {...props}>
          <option value="">Selecione</option>
          {renderOptions()}
        </SelectField>
      </SelectFieldWrapper>
    </SelectWrapper>
  )
}

SelectComponent.propTypes = {
  itemsDirection: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ),
  name: PropTypes.string,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  width: PropTypes.number,
}

export default SelectComponent
