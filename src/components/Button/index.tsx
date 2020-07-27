import React from 'react'

import LoadingIcon from 'components/Loading'
import { themeColors } from 'styles/theme'

import * as s from './styles'

interface IProps {
  color?: 'primary' | 'secondary'
  outline?: boolean
  loading?: boolean
  loadingColor?: keyof typeof themeColors
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  dataTestId?: 'button'
}

const Button: React.FC<IProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  color = 'primary',
  outline = false,
  loading = false,
  loadingColor = 'blue4',
  onClick,
  disabled,
  ...rest
}) => (
  <s.Button
    onClick={onClick}
    color={color}
    outline={outline}
    disabled={disabled}
    {...rest}
  >
    <s.Content>
      {loading ? <LoadingIcon type="spinner" color={loadingColor} /> : children}
    </s.Content>
  </s.Button>
)

export default Button
