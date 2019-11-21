import React, { useState } from 'react'
import {
  AccordionWrapper,
  AccordionHeader,
  AccordionTitle,
  AccordionBody,
} from './styles'

const Accordion = ({ title, children, id }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AccordionWrapper isOpen={isOpen} id={id}>
      <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
        <AccordionTitle>{title}</AccordionTitle>
      </AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </AccordionWrapper>
  )
}

export default Accordion
