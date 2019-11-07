import React from 'react'
import Button from '../../Button'

import { Container, Content, Title, ImageBackground } from './styles'

export default function TopBanner({
  title,
  description,
  image,
  imageDescription,
  buttonText
}) {
  return (
    <Container>
      <Content>
        <Title textColor="white">{title}</Title>
        <p>{description}</p>
        <br />
        <Button color="secondary" className="button-with-right-icon">
          {buttonText} <span>&gt;</span>
        </Button>
      </Content>
      <ImageBackground src={image} alt={imageDescription} />
    </Container>
  )
}
