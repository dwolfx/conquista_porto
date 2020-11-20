import React from 'react'

import Icon from 'components/IconExporter'
import { Link, BadgeNotification } from './styles'

interface IProps {
  noIcon?: boolean
  noIconPadding?: boolean
  disabled?: boolean
  hasNotification?: boolean
}

const ButtonLink: React.FC<IProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  noIcon = false,
  noIconPadding = false,
  disabled = false,
  hasNotification = false,
  ...rest
}) => {
  return (
    <Link disabled={disabled} noIconPadding={noIconPadding} {...rest}>
      {children}
      {hasNotification && <BadgeNotification />}
      {!noIcon && <Icon name="arrowright" />}
    </Link>
  )
}

export default ButtonLink
