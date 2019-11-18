import React, { useState, useEffect } from 'react'
import {
  CarouselItemWrapper,
  IconWrapper,
  TextTitle,
  TextLight,
  TextWrapper,
  ImgDynamic
} from './styles'

const CarouselItem = ({ img, imgTitle, imgDescription, imgPath }) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    async function loadImg() {
      const imgPromise = await import(
        `assets/images/pages/solutions/${imgPath}/${img}.jpg`
      )
      setImage(imgPromise.default)
    }
    loadImg()
  }, [img, imgPath])

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
