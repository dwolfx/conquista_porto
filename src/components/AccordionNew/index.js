import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  AccordionWrapper,
  AccordionHeader,
  AccordionHeaderLabel,
  AccordionHeaderText,
  AccordionBody,
} from './styles'

const AccordionNew = ({
  labelNode,
  titleNode,
  children,
  bodyPadding,
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
      <AccordionBody isOpen={isOpen} bodyPadding={bodyPadding}>
        {children}
      </AccordionBody>
    </AccordionWrapper>
  )
}

AccordionNew.propTypes = {
  labelNode: PropTypes.string,
  titleNode: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  bodyPadding: PropTypes.string,
  openByDefault: PropTypes.bool,
}

AccordionNew.defaultProps = {
  labelNode: '',
  bodyPadding: '',
  openByDefault: false,
}

export default AccordionNew
