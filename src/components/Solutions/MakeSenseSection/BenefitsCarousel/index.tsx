import React from 'react'
import { defaultSettings } from 'components/Carousel/index'
import { Carousel } from './styles'
import CarouselCard from './BenefitsCarouselCard/index'
import { Settings } from 'react-slick'

export default function({ benefitsData }: IProps) {
  const settings: Settings = {
    ...defaultSettings,
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
    <Carousel settings={settings}>
      {benefitsData.map(({ title, description, icon }) => {
        return (
          <CarouselCard
            key={title}
            title={title}
            description={description}
            icon={icon}
          />
        )
      })}
    </Carousel>
  )
}

export interface IBenefitsData {
  title: string
  description: string
  icon: string
}

interface IProps {
  benefitsData: IBenefitsData[]
}
