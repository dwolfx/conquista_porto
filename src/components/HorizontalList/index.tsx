import React from 'react'
import { uuid } from 'uuidv4'

import { Container, StartBlock, EndBlock } from './styles'
interface IProps {
  startItems?: React.ReactNode[]
  endItems?: React.ReactNode[] | null
  size?: 'large' | 'medium' | 'medium-large' | 'small' | 'default'
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
      {startItems && startItems.length > 0 ? (
        <StartBlock hasEndBlock={Boolean(endItems && !!endItems.length)}>
          {startItems.map(Item => (
            <React.Fragment key={uuid()}>{Item}</React.Fragment>
          ))}
        </StartBlock>
      ) : null}
      {endItems && endItems.length > 0 ? (
        <EndBlock hasStartBlock={Boolean(startItems && !!startItems.length)}>
          {endItems.map(Item => (
            <React.Fragment key={uuid()}>{Item}</React.Fragment>
          ))}
        </EndBlock>
      ) : null}
    </Container>
  )
}
