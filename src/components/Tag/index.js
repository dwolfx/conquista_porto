import React from 'react'
import PropTypes from 'prop-types'

import { Container, Text } from './styles'

export default function Tag({ color, text }) {
  return (
    <Container color={color}>
      <Text>{text}</Text>
    </Container>
  )
}

Tag.propTypes = {
  color: PropTypes.oneOf(['blue', 'gray', 'green']).isRequired,
  text: PropTypes.string.isRequired,
}
