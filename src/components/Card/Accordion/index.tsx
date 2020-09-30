import React, { useState } from 'react'
import ButtonIcon from 'components/Button/Icon'

import * as s from './styles'
import { dict } from 'components/IconExporter'

interface IProps {
  footer?: React.ReactNode
  icon?: keyof typeof dict
  initialHeight: number
  title: React.ReactNode | string
}

const AccordionCard: React.FC<IProps> = ({
  children,
  footer,
  icon,
  initialHeight,
  title,
  ...rest
}) => {
  const [isExpanded, setExpanded] = useState(false)

  return (
    <s.Card
      headerIcon={icon}
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
      isExpanded={isExpanded}
      data-testid="accordion-card"
      {...rest}
    >
      {children}
    </s.Card>
  )
}

export default AccordionCard
