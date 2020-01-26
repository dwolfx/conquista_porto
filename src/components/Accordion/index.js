import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { AccordionWrapper, AccordionHeader, AccordionBody } from './styles'

const Accordion = ({
  titleNode,
  children,
  id,
  isGrayArrow,
  padding,
  noBodyPadding,
  noBackground,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AccordionWrapper isOpen={isOpen} id={id} padding={padding} {...rest}>
      <AccordionHeader
        padding={padding}
        isGrayArrow={isGrayArrow}
        onClick={() => setIsOpen(!isOpen)}
      >
        {titleNode}
      </AccordionHeader>
      <AccordionBody noBodyPadding={noBodyPadding}>{children}</AccordionBody>
    </AccordionWrapper>
  )
}

export default Accordion

Accordion.propTypes = {
  titleNode: PropTypes.node.isRequired,
  isGrayArrow: PropTypes.bool,
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
  padding: PropTypes.string,
  noBodyPadding: PropTypes.bool,
  noBackground: PropTypes.bool,
}
Accordion.defaultProps = {
  id: '',
  isGrayArrow: false,
}
