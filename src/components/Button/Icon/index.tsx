import React, { ButtonHTMLAttributes } from 'react'

import Icon from 'components/IconExporter'

import { ButtonStyled, IProps } from './styles'

const ButtonIcon: React.FC<IProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  icon,
  size = 'small',
  isLoading = false,
  onClick,
  ...rest
}) => {
  return (
    <ButtonStyled size={size} onClick={onClick} {...rest}>
      {!isLoading ? <Icon name={icon} /> : <Icon name="spinner" />}
    </ButtonStyled>
  )
}

export default ButtonIcon
