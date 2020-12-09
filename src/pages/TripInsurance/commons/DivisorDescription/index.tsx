import React from 'react'

import { IProps } from './types'
import * as S from './styles'

export default function DivisorDescription({ title, text, ...rest }: IProps) {

  return (
    <S.Wrapper {...rest}>
      <S.PaddingText bold type="heading4" color="gray6">{title}</S.PaddingText>
      <S.StyledDivisor />
      <S.PaddingText type="headline" color="gray6">{text}</S.PaddingText>
    </S.Wrapper>
  )
}
