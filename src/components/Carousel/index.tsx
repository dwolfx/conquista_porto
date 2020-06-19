import React from 'react'
import { Settings } from 'react-slick'

import Slider, { ChangePageButton, ForwardIcon, BackwardIcon } from './styles'

export const NextArrow = () => {
  return (
    <ChangePageButton>
      <ForwardIcon />
    </ChangePageButton>
  )
}

export const PreviousArrow = () => {
  return (
    <ChangePageButton>
      <BackwardIcon />
    </ChangePageButton>
  )
}

export const defaultSettings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: NextArrow(),
  prevArrow: PreviousArrow(),
}

interface IProps {
  settings: Settings
}

const Carousel: React.FC<IProps> = ({ children, settings = {}, ...rest }) => {
  const sliderSettings = { ...defaultSettings, ...settings }
  // let sliderRef: Slider
  // sliderRef.+
  return (
    <Slider {...rest} {...sliderSettings}>
      {children}
    </Slider>
  )
}

export default Carousel
