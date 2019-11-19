import React from 'react'
import {
  CarouselCardWrapper,
  IconWrapper,
  TextLight,
  TextWrapper,
  ImgDynamic
} from './styles'

const CarouselCard = ({ logoName, description }: IProps) => {
  const logo = require(`assets/images/pages/solutions/investments/${logoName}.jpg`)
  return (
    <CarouselCardWrapper>
      <IconWrapper>
        <ImgDynamic src={logo} />
      </IconWrapper>
      <TextWrapper>
        <TextLight>{description}</TextLight>
      </TextWrapper>
    </CarouselCardWrapper>
  )
}

export default CarouselCard

interface IProps {
  logoName: string
  description: string
}
