import React from 'react'
import Items from '../Items'
import * as S from './styles'
import { IPredictionProps } from '../types'

export default function ResultPredictionModal({
  predictions,
  warning,
}: IPredictionProps) {
  return (
    <S.PromptStyled
      hasUnsavedChanges={warning}
      title="Salvar Carteira?"
      buttonTextCancel="Voltar"
      buttonTextConfirm="Continuar"
      description="Provavelmente você não atingirá a meta com os fundos escolhidos."
    >
      <Items predictions={predictions} warning={warning} />
    </S.PromptStyled>
  )
}
