import React from 'react'
import { Button } from './styles'
import history from '../../services/history';

const ConquistaButton = ({ children, color, onClickFunc, url }) => {

  function click() {
    if (onClickFunc) onClickFunc();
    if (url) history.push(url)
  }

  return (
    <Button color={color} onClick={click}>{children}</Button>
  )
}

export default ConquistaButton
