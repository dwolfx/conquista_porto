import React, { useState } from 'react';

import { Container, RelativeHolder } from './styles';

export default function Dropdown({ isOpen, children }) {
  return (
    <RelativeHolder>
      <Container isOpen={isOpen}>
        {children}
      </Container>
    </RelativeHolder>

  );
}
