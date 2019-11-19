import React from 'react'
import { defaultSettings } from '../../Carousel'
import CarouselItem from './CarouselCard/index'
import { InvestmentsCarouselWrapper, TitleHeader, Carousel } from './styles'
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
    <InvestmentsCarouselWrapper>
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
    </InvestmentsCarouselWrapper>
  )
}

export default MoreDetails
