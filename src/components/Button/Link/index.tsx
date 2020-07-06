import React from 'react'

import Icon from 'components/IconExporter'
import { Link } from './styles'

interface IProps {
  noIcon?: boolean
  disabled?: boolean
  onClick: () => void
  dataTestId?: string
}

const ButtonLink: React.FC<IProps> = ({
  children,
  noIcon = false,
  disabled = false,
  onClick,
  dataTestId,
  ...rest
}) => {
  return (
    <Link disabled={disabled} onClick={onClick} data-testid={dataTestId} {...rest}>
      {children}
      {!noIcon && <Icon name="arrowright" />}
    </Link>
  )
}

export default ButtonLink
