import React, { useEffect, useState } from 'react'
import ButtonIcon from 'components/Button/Icon'

import * as s from './styles'
import { dict } from 'components/IconExporter'

interface IProps {
  footer?: React.ReactNode
  icon?: keyof typeof dict
  initialHeight: number
  title: React.ReactNode | string
  isOpen?: boolean
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const AccordionCard: React.FC<IProps> = ({
  children,
  footer,
  icon,
  initialHeight,
  title,
  isOpen,
  setIsOpen,
  ...rest
}) => {
  const [isExpanded, setExpanded] = useState(isOpen || false)

  useEffect(() => {
    if (setIsOpen) {
      setIsOpen(isExpanded)
    }
  }, [isExpanded, setIsOpen])

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
      maxHeight={isExpanded ? '100vh' : `${initialHeight}px`}
      isExpanded={isExpanded}
      data-testid="accordion-card"
      {...rest}
    >
      {children}
    </s.Card>
  )
}

export default AccordionCard
