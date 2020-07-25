import React from 'react'

import { Button, IButtonProps } from './styles'

const ButtonTag: React.FC<IButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  color = '',
  children,
  ...rest
}) => {
  return (
    <Button color={color} {...rest}>
      {children}
    </Button>
  )
}
export default ButtonTag
