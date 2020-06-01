import React from 'react'

import Icon, { dict } from 'components/IconExporter'

import Text from 'components/Text'

import * as s from './styles'

export default ({
  icon,
  title,
  background,
  align = 'end',
  isLoading = false,
  ...rest
}: IProps) => (
  <s.CardWrapper align={align} {...rest}>
    <s.CardBackground image={background} />
    {title && (
      <s.CardTitle>
        {icon && (
          <s.IconWrapper>
            <Icon name={icon} />
          </s.IconWrapper>
        )}
        <Text type="button" color="white">
          {title}
        </Text>
        {isLoading && <s.Loading type="spinner" color="white" />}
      </s.CardTitle>
    )}
  </s.CardWrapper>
)

interface IProps {
  align?: 'start' | 'end'
  background: string
  icon?: keyof typeof dict
  isLoading?: boolean
  onClick?: () => void
  title?: string
}
