import React from 'react'
import Slider, { NextButton, FowardIcon, BackwardIcon } from './styles'
import { Settings } from 'react-slick'

export function NextArrow() {
  return (
    <NextButton>
      <FowardIcon />
    </NextButton>
  )
}

export function PreviousArrow() {
  return (
    <NextButton>
      <BackwardIcon />
    </NextButton>
  )
}

const defaultSettings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: NextArrow(),
  prevArrow: PreviousArrow()
}

export default function Carousel({
  children,
  settings,
  ...props
}: IProps<JSX.Element>) {
  const sliderSettings = { ...defaultSettings, ...settings }
  return (
    <Slider {...props} {...sliderSettings}>
      {children}
    </Slider>
  )
}

interface IProps<T> extends React.HTMLAttributes<T> {
  children: JSX.Element | JSX.Element[]
  settings?: Settings
}
