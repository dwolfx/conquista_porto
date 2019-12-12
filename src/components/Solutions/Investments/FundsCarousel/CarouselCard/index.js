import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CarouselCardWrapper,
  IconWrapper,
  TextLight,
  TextWrapper,
  ImgDynamic,
} from './styles'

const CarouselCard = ({ logoName, description }) => {
  const [image, setImage] = useState(null)

  useEffect(() => {
    async function loadImg() {
      try {
        const logo = await import(
          `assets/images/pages/solutions/investments/${logoName}.jpg`
        )

        setImage(logo.default)
      } catch (error) {
        // supress error
      }
    }
    loadImg()
  }, [logoName])

  return (
    <CarouselCardWrapper>
      <IconWrapper>
        <ImgDynamic src={image} />
      </IconWrapper>
      <TextWrapper>
        <TextLight>{description}</TextLight>
      </TextWrapper>
    </CarouselCardWrapper>
  )
}

CarouselCard.propTypes = {
  logoName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default CarouselCard
