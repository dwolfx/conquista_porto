import React from 'react'
import { themeColors } from 'styles/theme'

import {
  ComponentContainer,
  LoadingContainer,
  LoadingBar,
  LegendText,
  IconAnimated,
} from './styles'

interface IProps {
  color?: keyof typeof themeColors
  width?: number
  type?: 'spinner' | 'bar'
  legend?: string
  placement?: 'top' | 'bottom'
  dataTestId?: 'loading'
}

const Loading: React.FC<IProps> = ({
  color = 'blue4',
  width = 28,
  type = 'spinner',
  legend = '',
  placement = 'top',
  ...rest
}) => {
  if (type === 'spinner') {
    return <IconAnimated name="spinner" color={color} width={width} {...rest} />
  }

  return (
    <ComponentContainer {...rest}>
      {legend && (
        <LegendText type="headline" color="gray5" placement={placement}>
          {legend}
        </LegendText>
      )}
      <LoadingContainer>
        <LoadingBar color={color} />
      </LoadingContainer>
    </ComponentContainer>
  )
}

export default Loading
