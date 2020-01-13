import React from 'react'
import PropTypes from 'prop-types'

import { Container, StartBlock, EndBlock } from './styles'

export default function HorizontalList({
  startItems,
  endItems,
  height,
  noPadding,
}) {
  return (
    <Container height={height} noPadding={noPadding}>
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

HorizontalList.propTypes = {
  startItems: PropTypes.arrayOf(PropTypes.node),
  endItems: PropTypes.arrayOf(PropTypes.node),
}
