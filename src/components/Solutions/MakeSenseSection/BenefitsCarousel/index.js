import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from './styles'
import CarouselCard from './BenefitsCarouselCard/index'

const BenefitsCarousel = ({ benefitsData }) => {
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
    <Carousel settings={settings}>
      {benefitsData.map(({ title, description, icon }) => (
        <CarouselCard
          key={title}
          title={title}
          description={description}
          icon={icon}
        />
      ))}
    </Carousel>
  )
}

export const propTypes = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
  })
)

BenefitsCarousel.propTypes = {
  benefitsData: propTypes.isRequired,
}

export default BenefitsCarousel
