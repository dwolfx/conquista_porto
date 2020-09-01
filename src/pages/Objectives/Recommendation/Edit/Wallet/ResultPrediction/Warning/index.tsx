import React from 'react'
import Text from 'components/Text'
import * as S from './styles'

export default function ResultPredictionsWarning() {
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
