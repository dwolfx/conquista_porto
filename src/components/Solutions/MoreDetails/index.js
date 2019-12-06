import React from 'react'
import PropTypes from 'prop-types'

import { defaultSettings } from '../../Carousel'
import CarouselItem from './CarouselCard/index'
import { CarouselWrapper, TitleHeader, Carousel, Container } from './styles'

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
    <Container>
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
    </Container>
  )
}

MoreDetails.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
      imgTitle: PropTypes.string,
      imgDescription: PropTypes.string,
      imgPath: PropTypes.string,
    })
  ).isRequired,
}
export default MoreDetails
