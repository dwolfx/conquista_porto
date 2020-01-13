import React from 'react'
import PropTypes from 'prop-types'

import { Container, ListElements } from './styles'

export default function VerticalList({ elements }) {
  return (
    <Container>
      <ListElements>
        {elements &&
          elements.map((Item, index) => (
            <React.Fragment key={index.toString()}>{Item}</React.Fragment>
          ))}
      </ListElements>
    </Container>
  )
}

VerticalList.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.node).isRequired,
}
