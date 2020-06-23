import React from 'react'

import Icon from 'components/IconExporter'
import { Link } from './styles'

interface IProps {
  noIcon?: boolean
  noIconPadding?: boolean
  disabled?: boolean
}

const ButtonLink: React.FC<IProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  noIcon = false,
  noIconPadding = false,
  disabled = false,
  ...rest
}) => {
  return (
    <Link disabled={disabled} noIconPadding={noIconPadding} {...rest}>
      {children}
      {!noIcon && <Icon name="arrowright" />}
    </Link>
  )
}

export default ButtonLink
