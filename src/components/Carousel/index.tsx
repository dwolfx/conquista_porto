import React from 'react'
import Slider, { Settings } from 'react-slick'

import {
  ChangePageButton,
  ForwardIcon,
  BackwardIcon,
  SliderCustomizable,
} from './styles'

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
  children: React.ReactNode
}

const Carousel = React.forwardRef<Slider, IProps>(
  ({ children, settings = {}, ...rest }, ref) => {
    const sliderSettings = { ...defaultSettings, ...settings }
    return (
      <SliderCustomizable ref={ref} {...rest} {...sliderSettings}>
        {children}
      </SliderCustomizable>
    )
  }
)

export default Carousel
