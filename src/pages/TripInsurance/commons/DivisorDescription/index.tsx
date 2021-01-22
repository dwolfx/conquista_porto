import React from 'react'

import useMedia from 'hooks/useMedia'

import { IProps } from './types'
import * as S from './styles'

export default function DivisorDescription({ title, text, ...rest }: IProps) {
  const isMobile = useMedia('sm')

  return (
    <S.Wrapper {...rest}>
      <S.PaddingText bold type="heading4" color="gray6">
        {title}
      </S.PaddingText>
      <S.StyledDivisor />
      {isMobile ? (
        <S.PaddingText type="body" color="gray6">
          {text}
        </S.PaddingText>
      ) : (
        <S.PaddingText type="headline" color="gray6">
          {text}
        </S.PaddingText>
      )}
    </S.Wrapper>
  )
}
