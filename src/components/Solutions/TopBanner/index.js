import React from 'react'
import Button from '../../Button'

import { Container, Content, Title, ImageBackground } from './styles'

export default function TopBanner({
  title,
  description,
  image,
  imageDescription,
  buttonText,
  onClick,
}) {
  return (
    <Container>
      <Content>
        <Title textColor="white">{title}</Title>
        <p>{description}</p>
        <br />
        {onClick && (
          <Button
            color="secondary"
            className="button-with-right-icon"
            onClick={onClick}
          >
            {buttonText} <span>&gt;</span>
          </Button>
        )}
      </Content>
      <ImageBackground src={image} alt={imageDescription} />
    </Container>
  )
}
