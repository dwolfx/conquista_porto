import React, { useState, useEffect } from 'react'
import {
  CarouselCardWrapper,
  IconWrapper,
  TextTitle,
  TextLight,
  TextWrapper,
  ImgDynamic,
} from './styles'

const CarouselCard = ({ img, imgTitle, imgDescription, imgPath }) => {
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
    <CarouselCardWrapper>
      <IconWrapper>
        <ImgDynamic src={image} />
      </IconWrapper>
      <TextWrapper>
        {imgTitle ? <TextTitle>{imgTitle}</TextTitle> : null}
        <TextLight>{imgDescription}</TextLight>
      </TextWrapper>
    </CarouselCardWrapper>
  )
}

export default CarouselCard
