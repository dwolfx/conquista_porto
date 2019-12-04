import React from 'react'
import PropTypes from 'prop-types'

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

TopBanner.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageDescription: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

TopBanner.defaultProps = {
  onClick: () => {},
}
