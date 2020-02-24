import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import {
  AccordionWrapper,
  AccordionHeader,
  AccordionHeaderText,
  AccordionBody,
  AccordionCloseButton,
} from './styles'

const AccordionNew = ({
  bodyPadding,
  children,
  labelNode,
  openByDefault,
  titleNode,
  triggerCloseOnArrow,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(openByDefault)

  const handleToggle = () => {
    setIsOpen(!isOpen)

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 600)
  }

  return (
    <AccordionWrapper isOpen={isOpen} {...rest}>
      <AccordionHeader
        data-gtm-type="click"
        data-gtm-clicktype="accordion"
        data-gtm-name={titleNode}
        onClick={() => (!triggerCloseOnArrow ? handleToggle() : null)}
        css={`
          cursor: ${!triggerCloseOnArrow ? 'pointer' : 'auto'};
        `}
      >
        {typeof titleNode === 'string' ? (
          <AccordionHeaderText>{titleNode}</AccordionHeaderText>
        ) : (
          titleNode
        )}
        <AccordionCloseButton
          onClick={() => (triggerCloseOnArrow ? handleToggle() : null)}
        />
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
  triggerCloseOnArrow: PropTypes.bool,
}

AccordionNew.defaultProps = {
  bodyPadding: '',
  endHeaderNode: null,
  labelNode: '',
  openByDefault: false,
  triggerCloseOnArrow: false,
}

export default AccordionNew
