import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Text from 'components/Text'
import Button from 'components/Button'
import Items from '../Items'
import * as S from './styles'
import { IResultPredictionModalProps } from '../types'

export default function ResultPredictionModal({
  prediction,
  warning,
  isOpen,
  handleClose,
  handleButtonAction,
}: IResultPredictionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { isLoadingObjectiveManagement } = useSelector((state: any) => ({
    isLoadingObjectiveManagement: state.objectiveManagement.isLoading,
  }))

  return (
    <S.Modal
      modalTitle="Salvar Carteira?"
      handleClose={() => handleClose()}
      isOpen={isOpen}
    >
      <Text type="headline">
        Provavelmente você não atingirá a meta com os fundos escolhidos.
      </Text>
      <Items prediction={prediction} warning={warning} />
      <S.Actions>
        <Button outline onClick={() => handleClose()}>
          Voltar
        </Button>
        <Button
          onClick={() => {
            handleButtonAction()
            setIsLoading(isLoadingObjectiveManagement)
          }}
          loading={isLoading}
        >
          Continuar
        </Button>
      </S.Actions>
    </S.Modal>
  )
}
