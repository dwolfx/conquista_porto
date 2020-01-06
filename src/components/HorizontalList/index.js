import React from 'react'

import { Container, StartBlock, EndBlock } from './styles'

export default function HorizontalList({ startItems, endItems }) {
  return (
    <Container>
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
