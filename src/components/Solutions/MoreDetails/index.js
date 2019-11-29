import React from 'react'
import { defaultSettings } from '../../Carousel'
import CarouselItem from './CarouselCard/index'
import { CarouselWrapper, TitleHeader, Carousel } from './styles'
// import { Settings } from 'react-slick'

const MoreDetails = ({ title, data }) => {
  const settings = {
    ...defaultSettings,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  }
  return (
    <CarouselWrapper>
      <TitleHeader>{title}</TitleHeader>
      <Carousel settings={settings}>
        {data.map(({ img, imgTitle, imgDescription, imgPath }) => (
          <CarouselItem
            key={imgTitle}
            img={img}
            imgTitle={imgTitle}
            imgDescription={imgDescription}
            imgPath={imgPath}
          />
        ))}
      </Carousel>
    </CarouselWrapper>
  )
}

export default MoreDetails
