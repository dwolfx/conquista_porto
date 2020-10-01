import React, { useState } from 'react'
import 'styled-components/macro'

import Carousel from 'components/Carousel'
import Slide from '../Slide'
import useMedia from 'hooks/useMedia'
import { ICardCarouselSlide } from '../types'
import * as S from './styles'

const CustomNextArrow = () => {
  return <S.NextButton />
}

const CustomPreviousArrow = () => {
  return <S.PrevButton />
}

let customSettings = {
  dots: false,
  arrows: true,
  variableWidth: true,
  infinite: false,
  swipeToSlide: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: CustomNextArrow(),
  prevArrow: CustomPreviousArrow(),
}

export default function Slider({
  list,
  addItemHandler = () => {},
  customOnClickSlideHandler = null,
}: {
  list: ICardCarouselSlide[]
  addItemHandler?: () => void
  customOnClickSlideHandler: ((clickedSlideId: number) => void) | null
}) {
  const [currentList, setCurrentList] = useState(list)
  const isTabletHorizontal = useMedia('lg')
  const isTabletVertical = useMedia('md')

  function onClickSlideHandler(clickedSlideId: number): void {
    const newList = [...currentList]

    setCurrentList(
      newList.map(item => {
        item.selected = item.id === clickedSlideId
        return item
      })
    )
  }

  if (isTabletHorizontal) {
    customSettings = {
      ...customSettings,
      slidesToShow: 2,
      arrows: false,
    }
  }

  if (isTabletVertical) {
    customSettings = {
      ...customSettings,
      slidesToShow: 1,
      arrows: false,
    }
  }

  if (!isTabletHorizontal && !isTabletVertical) {
    customSettings = {
      ...customSettings,
      arrows: true,
      slidesToShow: 3,
    }
  }

  return (
    <S.ContentContainer>
      <S.ButtonVertical color="primary" icon="add" onClick={addItemHandler} />
      <Carousel
        settings={customSettings}
        css={`
          width: calc(100% - 63px);
        `}
      >
        {currentList.map((item: ICardCarouselSlide) => (
          <Slide
            key={item.title + item.describe}
            {...item}
            onClickHandler={customOnClickSlideHandler || onClickSlideHandler}
            // onClickHandler={onClickSlideHandler}
          />
        ))}
      </Carousel>
    </S.ContentContainer>
  )
}
