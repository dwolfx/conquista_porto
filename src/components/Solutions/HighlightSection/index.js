import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../Button'

import { Container, Content, Title, Text } from './styles'

export default function HighlightSection({
  title,
  mainDescription,
  subDescription,
  buttonText,
}) {
  return (
    <Container backgroundColor="#115FA5">
      <Content>
        <Title textColor="white">{title}</Title>
        <Text>
          {mainDescription}
          <br />
          <br />
          {subDescription}
        </Text>
        <br />
        <br />
        <Button color="secondary">{buttonText}</Button>
      </Content>
    </Container>
  )
}

HighlightSection.propTypes = {
  title: PropTypes.string,
  mainDescription: PropTypes.string,
  subDescription: PropTypes.string,
  buttonText: PropTypes.string,
}
HighlightSection.defaultProps = {
  title: '',
  mainDescription: '',
  subDescription: '',
  buttonText: '',
}
