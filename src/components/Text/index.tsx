import React, { FunctionComponent } from 'react'
import { themeColors, fontTypes } from 'styles/theme'

import { TextStyle } from './styles'

export interface IProps {
  color?: keyof typeof themeColors
  bold?: boolean
  textAlign?: 'left' | 'center' | 'right' | 'unset'
  truncate?: boolean
  type?: keyof typeof fontTypes
}

const Text: FunctionComponent<IProps> = ({
  type = 'body',
  bold = false,
  color = 'unset',
  children,
  textAlign = 'unset',
  ...rest
}) => (
  <TextStyle
    type={type}
    bold={bold}
    color={color}
    textAlign={textAlign}
    {...rest}
  >
    {children}
  </TextStyle>
)

export default Text
