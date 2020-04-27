import React from 'react'

import Icon from 'components/IconExporter'

import { ButtonStyled, IProps } from './styles'

const ButtonIcon: React.FC<IProps> = ({
  color,
  icon,
  size = 'small',
  isLoading = false,
  iconWidth,
  onClick,
  ...rest
}) => {
  return (
    <ButtonStyled
      color={color}
      size={size}
      iconWidth={iconWidth}
      onClick={onClick}
      {...rest}
    >
      {!isLoading ? <Icon name={icon} /> : <Icon name="spinner" />}
    </ButtonStyled>
  )
}

export default ButtonIcon
