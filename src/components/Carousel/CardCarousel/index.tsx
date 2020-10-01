import React from 'react'
import 'styled-components/macro'

import Slider from './Slider'
import { ICardCarouselSlide } from './types'
import * as S from './styles'

export default function CardCarousel({
  hasError,
  isLoading,
  list,
  resetHandler,
  addItemHandler,
  customOnClickSlideHandler = null,
}: {
  hasError: boolean
  isLoading: boolean
  list: ICardCarouselSlide[]
  resetHandler?: () => void
  addItemHandler?: () => void
  customOnClickSlideHandler: ((clickedSlideId: number) => void) | null
}) {
  if (isLoading) {
    return (
      <S.ContainerCard>
        <S.LoadingStyled
          type="bar"
          legend="Aguarde, estamos buscando suas informações..."
        />
      </S.ContainerCard>
    )
  }

  if (hasError) {
    return (
      <S.ContainerCard>
        <S.ErrorText>
          Não foi possível carregar as suas informações.
        </S.ErrorText>
        {resetHandler && (
          <S.ButtonStyled
            onClick={resetHandler}
            loading={isLoading}
            loadingColor="white"
          >
            Tentar novamente
          </S.ButtonStyled>
        )}
      </S.ContainerCard>
    )
  }

  return (
    <Slider
      list={list}
      customOnClickSlideHandler={customOnClickSlideHandler}
      addItemHandler={addItemHandler}
    />
  )
}
