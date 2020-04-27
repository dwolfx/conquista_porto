import React, { FunctionComponent } from 'react'
import { themeColors, fontTypes } from 'styles/theme'

import { TextStyle } from './styles'

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

export interface IProps {
  color?: keyof typeof themeColors
  bold?: boolean
  textAlign?: 'left' | 'center' | 'right' | 'unset'
  type?: keyof typeof fontTypes
}

export default Text
