import React from 'react'
import { Button } from './styles'

const ConquistaButton = ({ children, color }) => (
  <Button color={color}>{children}</Button>
)

export default ConquistaButton
