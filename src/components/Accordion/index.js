import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  AccordionWrapper,
  AccordionHeader,
  AccordionBody,
  AccordionHeaderLabel,
  AccordionHeaderText,
} from './styles'

const Accordion = ({
  labelNode,
  titleNode,
  gtmName,
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
        data-gtm-type="click"
        data-gtm-clicktype="accordion"
        data-gtm-name={gtmName}
        padding={padding}
        isGrayArrow={isGrayArrow}
        onClick={() => setIsOpen(!isOpen)}
        labelNode
      >
        {labelNode && <AccordionHeaderLabel>{labelNode}</AccordionHeaderLabel>}
        <AccordionHeaderText>{titleNode}</AccordionHeaderText>
      </AccordionHeader>
      <AccordionBody noBodyPadding={noBodyPadding}>{children}</AccordionBody>
    </AccordionWrapper>
  )
}

export default Accordion

Accordion.propTypes = {
  labelNode: PropTypes.string,
  titleNode: PropTypes.node.isRequired,
  gtmName: PropTypes.string.isRequired,
  isGrayArrow: PropTypes.bool,
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  padding: PropTypes.string,
  noBodyPadding: PropTypes.bool,
  noBackground: PropTypes.bool,
}

Accordion.defaultProps = {
  labelNode: '',
  isGrayArrow: false,
  padding: '30px',
  noBodyPadding: false,
  noBackground: false,
}
