import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

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
      try {
        const imgPromise = await import(
          `../../../../assets/images/pages/solutions/${imgPath}/${img}.jpg`
        )
        setImage(imgPromise.default)
      } catch (error) {
        // supress error
      }
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

CarouselCard.propTypes = {
  img: PropTypes.string.isRequired,
  imgTitle: PropTypes.string.isRequired,
  imgDescription: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
}

export default CarouselCard
