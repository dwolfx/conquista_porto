import React from 'react'
import PropTypes from 'prop-types'
import { Settings } from 'react-slick'

import Slider, { ChangePageButton, ForwardIcon, BackwardIcon } from './styles'

export function NextArrow() {
  return (
    <ChangePageButton>
      <ForwardIcon />
    </ChangePageButton>
  )
}

export function PreviousArrow() {
  return (
    <ChangePageButton>
      <BackwardIcon />
    </ChangePageButton>
  )
}

export const defaultSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: NextArrow(),
  prevArrow: PreviousArrow(),
}

export default function Carousel({ children, settings, ...props }) {
  const sliderSettings = { ...defaultSettings, ...settings }
  return (
    <Slider {...props} {...sliderSettings}>
      {children}
    </Slider>
  )
}

Carousel.defaultProps = {
  settings: {},
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.shape(Settings),
}
