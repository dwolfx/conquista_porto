import React from 'react'
import Slider, { ChangePageButton, ForwardIcon, BackwardIcon } from './styles'
import { Settings } from 'react-slick'

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

export const defaultSettings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: NextArrow(),
  prevArrow: PreviousArrow(),
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
