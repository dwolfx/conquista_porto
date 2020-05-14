import React, { useState } from 'react'
import 'styled-components/macro'

import {
  AccordionWrapper,
  AccordionHeader,
  AccordionHeaderText,
  AccordionBody,
  AccordionCloseButton,
} from './styles'

interface IProps {
  bodyPadding?: string
  openByDefault: boolean
  titleNode: React.ReactNode | string
  triggerCloseOnArrow: boolean
}

const AccordionNew: React.FC<IProps> = ({
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

  const renderGTMPros = (show: boolean, isButton?: boolean) => {
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

export default AccordionNew
