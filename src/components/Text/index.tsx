import React, { FunctionComponent } from 'react'
import { themeColors, fontTypes } from 'styles/theme'

import { TextStyle } from './styles'

export interface IProps {
  color?: keyof typeof themeColors
  bold?: boolean
  textAlign?: 'left' | 'center' | 'right' | 'unset'
  textTransform?:
    | 'none'
    | 'capitalize'
    | 'uppercase'
    | 'lowercase'
    | 'full-width'
    | 'full-size-kana'
  truncate?: boolean
  type?: keyof typeof fontTypes
}

const Text: FunctionComponent<IProps> = ({
  type = 'body',
  bold = false,
  color = 'unset',
  children,
  textTransform = 'none',
  textAlign = 'unset',
  ...rest
}) => (
  <TextStyle
    type={type}
    bold={bold}
    color={color}
    textAlign={textAlign}
    textTransform={textTransform}
    {...rest}
  >
    {children}
  </TextStyle>
)

export default Text
