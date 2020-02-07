import React from 'react'
import PropTypes from 'prop-types'

import { Container, StartBlock, EndBlock } from './styles'

export default function HorizontalList({
  startItems,
  endItems,
  size,
  noPadding,
  marginBetweenElements,
}) {
  return (
    <Container size={size} noPadding={noPadding}>
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
  size: PropTypes.oneOf(['large', 'small', 'default']),
  noPadding: PropTypes.bool,
  marginBetweenElements: PropTypes.string,
}

HorizontalList.defaultProps = {
  startItems: null,
  endItems: null,
  size: 'default',
  noPadding: false,
  marginBetweenElements: '14px',
}
