/* eslint-disable react/no-array-index-key */
import React from 'react'
import { RadioWrapper, RadioTitle, RadioLabel, RadioInput } from './styles'

export default ({
  itemsDirection,
  itemsAlign,
  labelAlign,
  marginLeft,
  marginRight,
  options,
  paddingLeft,
  paddingRight,
  title,
  width,
  ...props
}) => {
  const renderOptions = option =>
    option &&
    option.map((item, index) => (
      <RadioLabel
        key={`#${props.name}-${item.value}-${index}`}
        disabled={item.disabled}
      >
        <RadioInput value={item.value} {...props} />
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
      {renderOptions(options)}
    </RadioWrapper>
  )
}
