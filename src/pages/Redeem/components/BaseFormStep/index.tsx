import React from 'react'
import { useSelector } from 'react-redux'
import useMedia from 'hooks/useMedia'

import { CardStyled, FixedBottom } from './styles'

interface BaseFormStep {
  cardBody: React.ReactNode
  cardFooter: React.ReactNode
  onChangeFundDetailOpen: () => void
}

const BaseFormStep = ({
  cardBody,
  cardFooter,
  onChangeFundDetailOpen,
}: BaseFormStep) => {
  const { redeemData } = useSelector((state: any) => ({
    redeemData: state.redeemData.data,
  }))
  const isMobile = useMedia('xs')
  return isMobile ? (
    <>
      <CardStyled
        headerIconInfo
        headerIconInfoClick={onChangeFundDetailOpen}
        headerTitle={redeemData?.dados_para_resgate?.fundo?.nome_carteira}
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
