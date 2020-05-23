/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

import { RadioWrapper, RadioTitle, RadioLabel, RadioInput } from './styles'

interface IProps {
  itemsDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  itemsAlign?: 'flex-start' | 'center' | 'flex-end'
  marginLeft?: number
  marginRight?: number
  onChange?: (event: any) => void
  options?:
    | {
        value: string | number
        name: string
        disabled?: boolean
      }[]
    | undefined
  name?: string
  paddingLeft?: number
  paddingRight?: number
  title?: string
  value?: string | number
  width?: number | string
  checkedItem?: string
}

const RadioComponent = ({
  itemsDirection = 'row',
  itemsAlign = 'center',
  marginLeft = 0,
  marginRight = 0,
  onChange,
  options,
  paddingLeft = 0,
  paddingRight = 0,
  title,
  value,
  width = 'auto',
  checkedItem,
  ...rest
}: IProps) => {
  const renderOptions = () =>
    options &&
    options.map((item, index) => (
      <RadioLabel
        key={`#${item.name}-${item.value}-${index}`}
        disabled={item.disabled}
      >
        <RadioInput
          data-gtm-form="input"
          data-gtm-name={item.name}
          value={item.value}
          onChange={onChange}
          checked={checkedItem === item.value}
          {...rest}
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

export default RadioComponent
