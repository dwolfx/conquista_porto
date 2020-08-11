import React, { useState, useEffect } from 'react'
import HorizontalList from 'components/HorizontalList'
import Text from 'components/Text'
import * as S from './style'

interface Predictions {
  pessimistic: string
  likely: string
  optimistic: string
}

interface IProps {
  predictions: Predictions | null
  warning: boolean
}

export default function ResultPredictionCard() {
  const [predictions, setPredictions] = useState<Predictions | null>(null)

  const financialGoalNotReached = (): boolean => true

  useEffect(() => {
    setPredictions({
      pessimistic: 'R$ 25.500,00',
      likely: 'R$ 25.500,00',
      optimistic: 'R$ 25.500,00',
    })
  }, [])

  return (
    <S.CardStyled
      headerTitle="Resultados estimados"
      headerIconInfo={true}
      tooltip={false}
      headerIconInfoMsg="Estas são as estimativas de quanto o seu investimento pode evoluir, baseadas no histórico de rendimentos dos fundos da carteira recomendada."
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

function PredictionsItems({ predictions, warning }: IProps) {
  return (
    <>
      <S.Items>
        <S.Item
          startItems={[<S.Label>Estimativa Pessimista</S.Label>]}
          endItems={[<S.Value>{predictions?.pessimistic}</S.Value>]}
        />
        <S.Item
          startItems={[<S.Label>Estimativa Provável</S.Label>]}
          endItems={[
            <S.Value hightlight={warning}>{predictions?.likely}</S.Value>,
          ]}
        />
        <S.Item
          startItems={[<S.Label>Estimativa Otimista</S.Label>]}
          endItems={[<S.Value>{predictions?.optimistic}</S.Value>]}
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
