import React from 'react'

import { Container, StartBlock, EndBlock } from './styles'

interface IProps {
  startItems?: React.ReactNode[]
  endItems?: React.ReactNode[]
  size?: 'large' | 'medium' | 'small' | 'default'
  noPadding?: boolean
  marginBetweenElements?: string
}

export default function HorizontalList({
  startItems,
  endItems,
  size = 'default',
  noPadding = false,
  ...rest
}: IProps) {
  return (
    <Container size={size} noPadding={noPadding} {...rest}>
      <StartBlock>
        {startItems &&
          startItems.map((Item, index) => (
            <React.Fragment key={index.toString()}>{Item}</React.Fragment>
          ))}
      </StartBlock>
      <EndBlock>
        {endItems &&
          endItems.map((Item, index) => (
            <React.Fragment key={index.toString()}>{Item}</React.Fragment>
          ))}
      </EndBlock>
    </Container>
  )
}
