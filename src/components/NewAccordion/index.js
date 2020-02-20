import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  AccordionWrapper,
  AccordionHeader,
  AccordionHeaderLabel,
  AccordionHeaderText,
  AccordionBody,
} from './styles'

const NewAccordion = ({ labelNode, titleNode, children, id, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AccordionWrapper isOpen={isOpen} id={id} {...rest}>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        {labelNode && <AccordionHeaderLabel>{labelNode}</AccordionHeaderLabel>}
        <AccordionHeaderText>{titleNode}</AccordionHeaderText>
      </AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </AccordionWrapper>
  )
}

NewAccordion.propTypes = {
  labelNode: PropTypes.string,
  titleNode: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}

NewAccordion.defaultProps = {
  labelNode: '',
}

export default NewAccordion
