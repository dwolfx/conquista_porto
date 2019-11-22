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
  placeholder,
  showPlaceholder,
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
          {showPlaceholder && (
            <option value="default">{placeholder || 'Selecione'}</option>
          )}
          {renderOptions()}
        </SelectField>
      </SelectFieldWrapper>
    </SelectWrapper>
  )
}

SelectComponent.propTypes = {
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
  placeholder: PropTypes.string,
  showPlaceholder: PropTypes.bool,
}
SelectComponent.defaultProps = {
  label: '',
  options: [],
  name: '',
  paddingLeft: 0,
  paddingRight: 0,
  width: 100,
  placeholder: '',
  showPlaceholder: true,
}

export default SelectComponent
