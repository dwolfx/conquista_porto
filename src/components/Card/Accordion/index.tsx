import React, { useState } from 'react'
import ButtonIcon from 'components/Button/Icon'

import * as s from './styles'

interface IProps {
  footer?: React.ReactNode
  initialHeight: number
  title: React.ReactNode | string
}

const AccordionCard: React.FC<IProps> = ({
  children,
  footer,
  initialHeight,
  title,
  ...rest
}) => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <s.Card
      headerTitle={title}
      headerEndItem={
        <ButtonIcon
          role="button"
          icon={isExpanded ? 'arrowup' : 'arrowdown'}
          onClick={() => setExpanded(expanded => !expanded)}
          data-gtm-subname={`card ${title}`}
          data-gtm-name="card acordeão botão expandir"
          data-gtm-type="click"
          data-gtm-clicktype="button"
        />
      }
      footer={isExpanded ? footer : null}
      height={isExpanded ? 'auto' : `${initialHeight}px`}
      data-testid="accordion-card"
      {...rest}
    >
      {children}
    </s.Card>
  )
}

export default AccordionCard
