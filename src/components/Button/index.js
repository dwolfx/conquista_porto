import React from 'react'
import { Button } from './styles'

/**
 *
 * Props available:
 * - color:
 *  - primary: blue background
 *  - secondary: orange: background
 *  - default: transparent background, blue border
 *
 * Example:
 *  - <Button color="primary" url="/perfil">Ir para perfil</Button>
 */

const ConquistaButton = ({ children, ...props }) => (
  <Button {...props}>{children}</Button>
)

export default ConquistaButton
