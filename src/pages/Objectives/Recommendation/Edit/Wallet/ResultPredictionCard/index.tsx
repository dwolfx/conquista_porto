import React, { useState, useEffect } from 'react'

import Text from 'components/Text'
import { TPrediction, IPredictionProps } from './types'
import * as S from './style'
import { formatMoney } from 'helpers'

export default function ResultPredictionCard() {
  const [predictions, setPredictions] = useState<TPrediction>(null)

  const financialGoalNotReached = (): boolean => true

  useEffect(() => {
    setPredictions({
      pessimistic: 25500,
      median: 25500,
      optimistic: 25500,
    })
  }, [])

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
        <PredictionsItems
          predictions={predictions}
          warning={financialGoalNotReached()}
        />
      )}
    </S.CardStyled>
  )
}

function PredictionsItems({ predictions, warning }: IPredictionProps) {
  return (
    <>
      <S.Items>
        <S.Item
          startItems={[<S.Label>Estimativa Pessimista</S.Label>]}
          endItems={[
            <S.Value>{formatMoney(predictions!.pessimistic)}</S.Value>,
          ]}
        />
        <S.Item
          startItems={[<S.Label>Estimativa Provável</S.Label>]}
          endItems={[
            <S.Value hightlight={warning}>
              {formatMoney(predictions!.median)}
            </S.Value>,
          ]}
        />
        <S.Item
          startItems={[<S.Label>Estimativa Otimista</S.Label>]}
          endItems={[<S.Value>{formatMoney(predictions!.optimistic)}</S.Value>]}
        />
      </S.Items>
      {warning && <PredictionsWarning />}
    </>
  )
}

function PredictionsWarning() {
  return (
    <S.Warning
      startItems={[
        <S.IconStyled name="information" color="magenta2" width={21} />,
      ]}
      endItems={[
        <Text color="magenta2" type="caption">
          A meta financeira não será atingida com essa composição de carteira.
        </Text>,
      ]}
    />
  )
}
