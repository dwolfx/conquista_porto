import React from 'react'
import { Button } from './styles'
import history from '../../services/history'

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

const ConquistaButton = ({ children, onClickFunc, url, ...props }) => {
  function click() {
    if (onClickFunc) onClickFunc()
    if (url) history.push(url)
  }

  return (
    <Button onClick={click} {...props}>
      {children}
    </Button>
  )
}

export default ConquistaButton
