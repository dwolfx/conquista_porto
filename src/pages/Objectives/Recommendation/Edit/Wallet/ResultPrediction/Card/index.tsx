import React from 'react'

import Text from 'components/Text'
import Warning from '../Warning'
import Items from '../Items'
import { IPredictionProps } from '../types'
import * as S from './styles'

export default function ResultPredictionCard({
  predictions,
  warning,
}: IPredictionProps) {
  return (
    <S.CardStyled
      headerTitle="Resultados estimados"
      headerIconInfo={true}
      tooltip={false}
      headerIconInfoMsg={
        <S.InformationPopoverContainer>
          <Text color="gray5" bold>
            Estas são as estimativas de quanto o seu investimento pode evoluir,
            baseadas no histórico de rendimentos dos fundos da carteira
            recomendada.
          </Text>
        </S.InformationPopoverContainer>
      }
    >
      {predictions === null ? (
        <S.LoadingStyled
          type="bar"
          legend="Aguarde, estamos buscando suas informações..."
        />
      ) : (
        <>
          <Items predictions={predictions} warning={warning} />
          {warning && <Warning />}
        </>
      )}
    </S.CardStyled>
  )
}
