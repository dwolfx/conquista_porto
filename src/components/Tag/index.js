import React from 'react';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Tag({color}) {
  return (
    <Container color={color}>
      <Text>TAG</Text>
    </Container>
  );
}

Tag.propTypes = {
  color: PropTypes.string,
}
