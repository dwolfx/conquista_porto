import React from 'react'
import CarouselItem from './CarouselCard/index'
import mockData from './mock'
import { CarouselWrapper, TitleHeader, Carousel } from './styles'
import { Settings } from 'react-slick'

const FundsCarouselSection = () => {
  const settings: Settings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  }
  return (
    <CarouselWrapper>
      <TitleHeader>Conheça as gestoras disponíveis no Conquista:</TitleHeader>
      <Carousel settings={settings}>
        {mockData.map(({ key, logo, description }) => (
          <CarouselItem key={key} logoName={logo} description={description} />
        ))}
      </Carousel>
    </CarouselWrapper>
  )
}

export default FundsCarouselSection
