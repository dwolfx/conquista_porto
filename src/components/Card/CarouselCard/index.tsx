import React, { useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { uuid } from 'uuidv4'
import 'styled-components/macro'

import { ICarouselCard } from './types'

import * as s from './styles'

/**
 * example:
 *
 *  import CarouselCard from 'components/Card/CarouselCard'
 *
 *  const arrayContent = [
 *    <Text type="title" bold color="green5">
 *      First - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *    </Text>,
 *    <Text type="title" bold color="magenta2">
 *      Second - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *    </Text>,
 *  ]
 *
 *  <CarouselCard
 *    headerIcon="persongroup"
 *    headerTitle="Title"
 *    headerEndItem={<div>Component</div>}
 *    arrayContent={arrayContent}
 *  />
 */

const CarouselCard: React.FC<ICarouselCard> = ({
  headerIcon,
  headerTitle,
  headerEndItem: HeaderEndItem,
  arrayContent,
  ...rest
}) => {
  const [count, setCount] = useState(1)
  const cardSlider = React.createRef<Slider>()

  const customSettings: Settings = {
    dots: true,
    arrows: false,
    variableWidth: false,
    infinite: false,
    swipeToSlide: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCount(next + 1),
  }

  const PrevAndNextButtons = () => (
    <>
      {HeaderEndItem && HeaderEndItem}
      <s.ButtonWrapper>
        {arrayContent && arrayContent?.length > 1 && (
          <>
            <s.ChangePageButton
              disabled={count <= 1}
              onClick={() => {
                cardSlider.current && cardSlider.current.slickPrev()
              }}
            >
              <s.BackwardIcon name="backward" />
            </s.ChangePageButton>
            <s.ChangePageButton
              disabled={count >= arrayContent.length}
              onClick={() => {
                cardSlider.current && cardSlider.current.slickNext()
              }}
            >
              <s.ForwardIcon name="forward" />
            </s.ChangePageButton>
          </>
        )}
      </s.ButtonWrapper>
    </>
  )

  return (
    <s.Card
      headerIcon={headerIcon}
      headerTitle={headerTitle}
      headerEndItem={<PrevAndNextButtons />}
      {...rest}
    >
      <s.Carousel ref={cardSlider} {...customSettings}>
        {arrayContent &&
          arrayContent.map(element => <s.Chip key={uuid()}>{element}</s.Chip>)}
      </s.Carousel>
    </s.Card>
  )
}

export default CarouselCard
