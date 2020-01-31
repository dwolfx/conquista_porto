import React from 'react'
import PropTypes from 'prop-types'

import { Container, Text } from './styles'

export default function Tag({ color, text, ...rest }) {
  return (
    <Container color={color} {...rest}>
      <Text>{text}</Text>
    </Container>
  )
}

Tag.propTypes = {
  color: PropTypes.oneOf(['blue', 'gray', 'green']).isRequired,
  text: PropTypes.string.isRequired,
}
