import React from 'react'

import Icon from 'components/IconExporter'
import { Link } from './styles'

interface IProps {
  noIcon?: boolean
  noIconPadding?: boolean
  disabled?: boolean
  onClick: () => void
  dataTestId?: string
}

const ButtonLink: React.FC<IProps> = ({
  children,
  noIcon = false,
  noIconPadding = false,
  disabled = false,
  onClick,
  ...rest
}) => {
  return (
    <Link
      disabled={disabled}
      noIconPadding={noIconPadding}
      onClick={onClick}
      {...rest}
    >
      {children}
      {!noIcon && <Icon name="arrowright" />}
    </Link>
  )
}

export default ButtonLink
