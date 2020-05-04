import React from 'react'

import Icon from 'components/IconExporter'

import { ButtonStyled, IProps } from './styles'

const ButtonIcon: React.FC<IProps> = ({
  color,
  icon,
  size = 'small',
  isLoading = false,
  onClick,
  ...rest
}) => {
  return (
    <ButtonStyled color={color} size={size} onClick={onClick} {...rest}>
      {!isLoading ? <Icon name={icon} /> : <Icon name="spinner" />}
    </ButtonStyled>
  )
}

export default ButtonIcon
