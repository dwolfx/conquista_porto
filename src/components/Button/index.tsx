import React from 'react'

import LoadingIcon from 'components/Loading'
import { themeColors } from 'styles/theme'

import * as s from './styles'

interface IProps {
  color?: 'primary' | 'secondary'
  outline?: boolean
  loading?: boolean
  loadingColor?: keyof typeof themeColors
  dataTestId?: 'button'
}

const Button: React.FC<IProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  color = 'primary',
  outline = false,
  loading = false,
  loadingColor = 'blue4',
  ...rest
}) => (
  <s.Button color={color} outline={outline} {...rest}>
    <s.Content>
      {loading ? <LoadingIcon type="spinner" color={loadingColor} /> : children}
    </s.Content>
  </s.Button>
)

export default Button
