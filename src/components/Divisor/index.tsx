import React from 'react'
import { StyledDivisor, IProps } from './styles'
const Divisor: React.FC<IProps> = ({ vertical, customSize, ...rest }) => (
  <StyledDivisor vertical={vertical} customSize={customSize} {...rest} />
)
export default Divisor
