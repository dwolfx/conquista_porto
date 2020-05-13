import React from 'react'

import { Button, IButtonProps } from './styles'

const ButtonTag: React.FC<IButtonProps> = ({
  color = 'primary',
  children,
  disabled,
  onClick,
  ...rest
}) => {
  return (
    <Button color={color} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </Button>
  )
}
export default ButtonTag
