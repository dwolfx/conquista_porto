import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { AccordionWrapper, AccordionHeader, AccordionBody } from './styles'

const Accordion = ({ titleNode, children, id, isOrangeArrow, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AccordionWrapper isOpen={isOpen} id={id} {...rest}>
      <AccordionHeader
        isOrangeArrow={isOrangeArrow}
        onClick={() => setIsOpen(!isOpen)}
      >
        {titleNode}
      </AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </AccordionWrapper>
  )
}

export default Accordion

Accordion.propTypes = {
  titleNode: PropTypes.node.isRequired,
  isOrangeArrow: PropTypes.bool,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
}
Accordion.defaultProps = {
  id: '',
  isOrangeArrow: false,
}
