import React from 'react'
import CarouselItem from './CarouselCard/index'
import { defaultSettings } from 'components/Carousel/index'
import { InvestmentsCarouselWrapper, TitleHeader, Carousel } from './styles'
import { Settings } from 'react-slick'

const MoreDetails = ({title, data}: any) => {
  const settings: Settings = {
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
        {data.map(({ img, imgTitle, imgDescription }: any) => (
          <CarouselItem key={imgTitle} img={img} imgTitle={imgTitle}imgDescription={imgDescription} />
        ))}
      </Carousel>
    </InvestmentsCarouselWrapper>
  )
}

export default MoreDetails
