import React from 'react'

import LoadingIcon from 'components/Loading'
import { themeColors } from 'styles/theme'

import { Button, Content, LoadingContainer } from './styles'

interface IProps {
  color?: 'primary' | 'secondary'
  outline?: boolean
  loading?: boolean
  loadingColor?: keyof typeof themeColors
  onClick: () => void
  disabled?: boolean
}

const ConquistaButton: React.FC<IProps> = ({
  children,
  color = 'primary',
  outline = false,
  loading = false,
  loadingColor = 'blue4',
  onClick,
  disabled,
  ...rest
}) => (
  <Button
    onClick={onClick}
    color={color}
    outline={outline}
    disabled={disabled}
    {...rest}
  >
    <Content>{children}</Content>
    {loading && (
      <LoadingContainer>
        <LoadingIcon type="spinner" color={loadingColor} />
      </LoadingContainer>
    )}
  </Button>
)

export default ConquistaButton
