import React from 'react'

import { Container, StartBlock, EndBlock } from './styles'

export default function HorizontalList({
  startItems,
  endItems,
  size = 'default',
  noPadding = false,
  marginBetweenElements = '14px',
  ...rest
}: IProps) {
  return (
    <Container size={size} noPadding={noPadding} {...rest}>
      <StartBlock marginBetweenElements={marginBetweenElements}>
        {startItems &&
          startItems.map((Item, index) => (
            <React.Fragment key={index.toString()}>{Item}</React.Fragment>
          ))}
      </StartBlock>
      <EndBlock marginBetweenElements={marginBetweenElements}>
        {endItems &&
          endItems.map((Item, index) => (
            <React.Fragment key={index.toString()}>{Item}</React.Fragment>
          ))}
      </EndBlock>
    </Container>
  )
}

interface IProps {
  startItems?: React.ReactNode[]
  endItems?: React.ReactNode[]
  size?: 'large' | 'small' | 'default'
  noPadding?: boolean
  marginBetweenElements?: string
}
