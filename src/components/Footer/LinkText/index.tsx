import React from 'react'

import { BlueText } from './styles'

interface IProps {
  hrefValue: string
  target?: string
}

const LinkText: React.FC<IProps> = ({ hrefValue, children, ...rest }) => (
  <a {...rest} href={hrefValue}>
    <BlueText>{children}</BlueText>
  </a>
)

export default LinkText
