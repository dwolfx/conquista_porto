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
  textAlign?: 'left' | 'center' | 'right'
  dataTestId?: 'loading'
}

const Loading = ({
  color = 'blue4',
  width = 28,
  type = 'spinner',
  legend = '',
  textAlign = 'left',
  placement = 'top',
  ...rest
}: IProps) => {
  if (type === 'spinner') {
    return (
      <IconAnimated
        name="spinner"
        color={color}
        width={width}
        data-testid="loading-spinner"
        {...rest}
      />
    )
  }

  return (
    <ComponentContainer {...rest}>
      {legend && (
        <LegendText
          type="headline"
          color="gray5"
          placement={placement}
          textAlign={textAlign}
          data-testid="legend"
        >
          {legend}
        </LegendText>
      )}
      <LoadingContainer>
        <LoadingBar color={color} data-testid="loading-bar" />
      </LoadingContainer>
    </ComponentContainer>
  )
}

export default Loading
