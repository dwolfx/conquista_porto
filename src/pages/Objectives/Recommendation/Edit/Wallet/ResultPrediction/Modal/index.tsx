import React from 'react'
import Text from 'components/Text'
import Button from 'components/Button'
import Items from '../Items'
import * as S from './styles'
import { IPredictionProps } from '../types'

export default function ResultPredictionModal({
  predictions,
  warning,
}: IPredictionProps) {
  return (
    <S.Modal
      modalTitle="Salvar Carteira?"
      handleClose={() => {}}
      isOpen={false}
    >
      <Text type="headline">
        Provavelmente você não atingirá a meta com os fundos escolhidos.
      </Text>
      <Items predictions={predictions} warning={warning} />
      <S.Actions>
        <Button outline>Voltar</Button>
        <Button>Continuar</Button>
      </S.Actions>
    </S.Modal>
  )
}
