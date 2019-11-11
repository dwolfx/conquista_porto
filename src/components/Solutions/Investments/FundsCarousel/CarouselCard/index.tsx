import React from 'react'
import {
  CarouselItemWrapper,
  IconWrapper,
  TextLight,
  TextWrapper,
  ImgDynamic
} from './styles'

const CarouselItem = ({ logoName, description }: IProps) => {
  const logo = require(`assets/images/pages/solutions/investments/${logoName}.jpg`)
  return (
    <CarouselItemWrapper>
      <IconWrapper>
        <ImgDynamic src={logo} />
      </IconWrapper>
      <TextWrapper>
        <TextLight>{description}</TextLight>
      </TextWrapper>
    </CarouselItemWrapper>
  )
}

export default CarouselItem

interface IProps {
  logoName: string
  description: string
}
