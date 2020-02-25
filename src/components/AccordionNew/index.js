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

  const renderGTMPros = (show, isButton) => {
    if (!show) {
      return null
    }

    if (isButton) {
      return {
        'data-gtm-type': 'click',
        'data-gtm-clicktype': 'accordion',
        'data-gtm-subname': 'accordion header',
        'data-gtm-name': 'botao fechar',
      }
    }

    return {
      'data-gtm-type': 'click',
      'data-gtm-clicktype': 'accordion',
      'data-gtm-name': 'accordion header',
    }
  }

  return (
    <AccordionWrapper isOpen={isOpen} bodyPadding={bodyPadding} {...rest}>
      <AccordionHeader
        onClick={() => (!triggerCloseOnArrow ? handleToggle() : null)}
        css={`
          cursor: ${!triggerCloseOnArrow ? 'pointer' : 'auto'};
        `}
        {...renderGTMPros(!triggerCloseOnArrow)}
      >
        {typeof titleNode === 'string' ? (
          <AccordionHeaderText>{titleNode}</AccordionHeaderText>
        ) : (
          titleNode
        )}
        <AccordionCloseButton
          onClick={() => (triggerCloseOnArrow ? handleToggle() : null)}
          {...renderGTMPros(triggerCloseOnArrow, true)}
        />
      </AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </AccordionWrapper>
  )
}

AccordionNew.propTypes = {
  bodyPadding: PropTypes.string,
  children: PropTypes.node.isRequired,
  endHeaderNode: PropTypes.node,
  openByDefault: PropTypes.bool,
  titleNode: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  triggerCloseOnArrow: PropTypes.bool,
}

AccordionNew.defaultProps = {
  bodyPadding: '',
  endHeaderNode: null,
  openByDefault: false,
  triggerCloseOnArrow: false,
}

export default AccordionNew
