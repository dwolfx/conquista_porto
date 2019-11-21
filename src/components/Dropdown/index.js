import React from 'react'

import { Container, RelativeHolder, Backdrop } from './styles'

export default function Dropdown({ isOpen, setOpen, children, width }) {
  return (
    <RelativeHolder>
      <Backdrop isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
      <Container isOpen={isOpen} width={width && width}>
        {children}
      </Container>
    </RelativeHolder>
  )
}
