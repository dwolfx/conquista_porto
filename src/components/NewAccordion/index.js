import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  AccordionWrapper,
  AccordionHeader,
  AccordionHeaderLabel,
  AccordionHeaderText,
  AccordionBody,
} from './styles'

const NewAccordion = ({
  labelNode,
  titleNode,
  children,
  openByDefault,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(openByDefault)
  return (
    <AccordionWrapper isOpen={isOpen} {...rest}>
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
  openByDefault: PropTypes.bool,
}

NewAccordion.defaultProps = {
  labelNode: '',
  openByDefault: false,
}

export default NewAccordion
