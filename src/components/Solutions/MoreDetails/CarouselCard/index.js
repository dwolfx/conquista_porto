import React from 'react'
import {
  CarouselItemWrapper,
  IconWrapper,
  TextTitle,
  TextLight,
  TextWrapper,
  ImgDynamic
} from './styles'

const CarouselItem = ({ img, imgTitle, imgDescription }) => {
  const image = import(`assets/images/pages/solutions/consortium/${img}.jpg`)
  return (
    <CarouselItemWrapper>
      <IconWrapper>
        <ImgDynamic src={image} />
      </IconWrapper>
      <TextWrapper>
        {imgTitle ? <TextTitle>{imgTitle}</TextTitle> : null}
        <TextLight>{imgDescription}</TextLight>
      </TextWrapper>
    </CarouselItemWrapper>
  )
}

export default CarouselItem
