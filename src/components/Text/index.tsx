import React, { FunctionComponent } from 'react'
import { themeColors, fontTypes } from 'styles/theme'

import { TextStyle } from './styles'

const htmlTag: {
  [key: string]: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
} = {
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  headline: 'h5',
  title: 'h6',
  subheading: 'p',
  body: 'p',
  caption: 'span',
  captionUppercase: 'span',
  button: 'span',
}

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
    as={htmlTag[type]}
    {...rest}
  >
    {children}
  </TextStyle>
)

export default Text
