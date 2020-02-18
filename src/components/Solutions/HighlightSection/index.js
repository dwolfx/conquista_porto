import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import Button from '../../Button'
import { Container, Content, Title, Text } from './styles'

export default function HighlightSection({
  title,
  mainDescription,
  subDescription,
  buttonText,
  onClick,
}) {
  const themeContext = useContext(ThemeContext)
  return (
    <Container backgroundColor={themeContext.colors.darkBlue2}>
      <Content
        data-gtm-type="container"
        data-gtm-name={`highlight section - ${title}`}
      >
        <Title textColor="white">{title}</Title>
        <Text>
          {mainDescription}
          <br />
          <br />
          {subDescription}
        </Text>
        <br />
        <br />
        <Button
          color="secondary"
          onClick={onClick}
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname={`${title}`}
          data-gtm-name={
            typeof buttonText === 'string'
              ? buttonText
              : buttonText.props.children[0]
          }
        >
          {console.log(buttonText)}
          {buttonText}
        </Button>
      </Content>
    </Container>
  )
}

HighlightSection.propTypes = {
  title: PropTypes.string,
  mainDescription: PropTypes.string,
  subDescription: PropTypes.string,
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClick: PropTypes.func,
}
HighlightSection.defaultProps = {
  title: '',
  mainDescription: '',
  subDescription: '',
  buttonText: '',
  onClick: () => {},
}
