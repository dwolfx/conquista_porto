import React from 'react'
import PropTypes from 'prop-types'

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

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  width: PropTypes.string,
}
Dropdown.defaultProps = {
  width: 'auto',
}
