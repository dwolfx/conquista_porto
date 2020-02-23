import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  AccordionWrapper,
  AccordionHeader,
  AccordionHeaderText,
  AccordionBody,
} from './styles'

const AccordionNew = ({
  bodyPadding,
  children,
  labelNode,
  openByDefault,
  titleNode,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(openByDefault)

  return (
    <AccordionWrapper isOpen={isOpen} {...rest}>
      <AccordionHeader
        data-gtm-type="click"
        data-gtm-clicktype="accordion"
        data-gtm-name={titleNode}
        onClick={() => setIsOpen(!isOpen)}
      >
        {typeof titleNode === 'string' ? (
          <AccordionHeaderText>{titleNode}</AccordionHeaderText>
        ) : (
          titleNode
        )}
      </AccordionHeader>
      <AccordionBody isOpen={isOpen} bodyPadding={bodyPadding}>
        {children}
      </AccordionBody>
    </AccordionWrapper>
  )
}

AccordionNew.propTypes = {
  bodyPadding: PropTypes.string,
  children: PropTypes.node.isRequired,
  endHeaderNode: PropTypes.node,
  labelNode: PropTypes.string,
  openByDefault: PropTypes.bool,
  titleNode: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
}

AccordionNew.defaultProps = {
  bodyPadding: '',
  endHeaderNode: null,
  labelNode: '',
  openByDefault: false,
}

export default AccordionNew
