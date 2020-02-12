import React from 'react'
import CarouselCard from './CarouselCard'
import mockData from './mock'
import { CarouselWrapper, TitleHeader, Carousel, Container } from './styles'

const FundsCarouselSection = () => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  }
  return (
    <Container>
      <CarouselWrapper
        data-gtm-type="container"
        data-gtm-name="Conheça as gestoras disponíveis no Conquista:"
      >
        <TitleHeader>Conheça as gestoras disponíveis no Conquista:</TitleHeader>
        <Carousel settings={settings}>
          {mockData.map(({ key, logo, description }) => (
            <CarouselCard key={key} logoName={logo} description={description} />
          ))}
        </Carousel>
      </CarouselWrapper>
    </Container>
  )
}

export default FundsCarouselSection
