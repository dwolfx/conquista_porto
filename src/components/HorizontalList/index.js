import React from 'react'
import PropTypes from 'prop-types'

import { Container, StartBlock, EndBlock } from './styles'

export default function HorizontalList({
  startItems,
  endItems,
  heightSize,
  noPadding,
  marginBetweenElements,
}) {
  return (
    <Container heightSize={heightSize} noPadding={noPadding}>
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

HorizontalList.propTypes = {
  startItems: PropTypes.arrayOf(PropTypes.node),
  endItems: PropTypes.arrayOf(PropTypes.node),
  heightSize: PropTypes.oneOf(['large', 'dynamic']),
  noPadding: PropTypes.bool,
  marginBetweenElements: PropTypes.number,
}

HorizontalList.defaultProps = {
  startItems: [],
  endItems: [],
  marginBetweenElements: '14px',
}
