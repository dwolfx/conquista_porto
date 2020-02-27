/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { RadioWrapper, RadioTitle, RadioLabel, RadioInput } from './styles'

const RadioComponent = ({
  itemsDirection,
  itemsAlign,
  marginLeft,
  marginRight,
  onChange,
  options,
  paddingLeft,
  paddingRight,
  title,
  value,
  width,
  itemChecked,
  ...props
}) => {
  const [checkedItem, setCheckedItem] = useState(itemChecked)

  const renderOptions = () =>
    options &&
    options.map((item, index) => (
      <RadioLabel
        key={`#${props.name}-${item.value}-${index}`}
        disabled={item.disabled}
      >
        <RadioInput
          data-gtm-form="input"
          data-gtm-name={item.name}
          value={item.value}
          onChange={event => {
            setCheckedItem(item.value)
            onChange(event)
          }}
          checked={checkedItem === item.value}
          {...props}
        />
        {item.name}
      </RadioLabel>
    ))

  return (
    <RadioWrapper
      width={width}
      itemsDirection={itemsDirection}
      itemsAlign={itemsAlign}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      marginLeft={marginLeft}
      marginRight={marginRight}
    >
      {title && <RadioTitle>{title}</RadioTitle>}
      {renderOptions()}
    </RadioWrapper>
  )
}

RadioComponent.propTypes = {
  itemsDirection: PropTypes.string,
  itemsAlign: PropTypes.string,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ),
  name: PropTypes.string,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  itemChecked: PropTypes.bool,
}
RadioComponent.defaultProps = {
  itemsDirection: 'row',
  itemsAlign: 'center',
  marginLeft: 0,
  marginRight: 0,
  onChange: () => {},
  options: [],
  name: '',
  paddingLeft: 0,
  paddingRight: 0,
  title: '',
  value: '',
  width: 'auto',
  itemChecked: false,
}

export default RadioComponent
