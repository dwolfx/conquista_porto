import React from 'react'
import { StyledDivisor, IProps } from './styles'

const Divisor = ({ vertical, customSize, ...rest }: IProps) => (
  <StyledDivisor vertical={vertical} customSize={customSize} {...rest} />
)
export default Divisor
