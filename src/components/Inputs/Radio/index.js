/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

import { RadioWrapper, RadioTitle, RadioLabel, RadioInput } from './styles'

const RadioComponent = ({
  itemsDirection,
  itemsAlign,
  marginLeft,
  marginRight,
  options,
  paddingLeft,
  paddingRight,
  title,
  width,
  ...props
}) => {
  const renderOptions = () =>
    options &&
    options.map((item, index) => (
      <RadioLabel
        key={`#${props.name}-${item.value}-${index}`}
        disabled={item.disabled}
      >
        <RadioInput value={item.value || item.name} {...props} />
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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
RadioComponent.defaultProps = {
  itemsDirection: 'row',
  itemsAlign: 'center',
  marginLeft: 0,
  marginRight: 0,
  options: [],
  name: '',
  paddingLeft: 0,
  paddingRight: 0,
  title: '',
  width: 'auto',
}

export default RadioComponent
