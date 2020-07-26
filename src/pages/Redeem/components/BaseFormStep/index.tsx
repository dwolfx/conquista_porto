import React from 'react'
import useMedia from 'hooks/useMedia'

import { CardStyled, FixedBottom } from './styles'

interface BaseFormStep {
  cardBody: React.ReactNode
  cardFooter: React.ReactNode
  onChangeFundDetailOpen: () => void
}

const BaseFormStep = ({
  onChangeFundDetailOpen,
  cardBody,
  cardFooter,
}: BaseFormStep) => {
  const isMobile = useMedia('xs')
  return isMobile ? (
    <>
      <CardStyled
        headerIconInfo
        headerIconInfoClick={onChangeFundDetailOpen}
        headerTitle="Informações"
      >
        {cardBody}
      </CardStyled>
      <FixedBottom>{cardFooter}</FixedBottom>
    </>
  ) : (
    <CardStyled footer={cardFooter}>{cardBody}</CardStyled>
  )
}

export default BaseFormStep
