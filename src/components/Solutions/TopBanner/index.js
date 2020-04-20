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
  noBtnIcon,
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
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname={`banner ${title}`}
            data-gtm-name={buttonText}
          >
            {buttonText}{' '}
            {!noBtnIcon && buttonText.toLowerCase() !== 'em breve' && (
              <span className="icon">&gt;</span>
            )}
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
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  noBtnIcon: PropTypes.bool,
}

TopBanner.defaultProps = {
  onClick: null,
  buttonText: null,
  noBtnIcon: false,
}
