import React from 'react'
import * as S from './style'

interface IProps {
  hasUnsavedChanges: boolean
  onConfirmation: () => void
}

export default function RulesModal({ ...rest }: IProps) {
  return (
    <S.ModalStyled
      {...rest}
      title="Sair da página?"
      buttonTextCancel="Continuar Solitação"
      buttonTextConfirm="Sair"
      description="Todas as informações serão perdidas e a solicitação não será finalizada."
    />
  )
}
