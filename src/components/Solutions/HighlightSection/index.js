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
}) {
  const themeContext = useContext(ThemeContext)
  return (
    <Container backgroundColor={themeContext.colors.darkBlue2}>
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
  buttonText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}
HighlightSection.defaultProps = {
  title: '',
  mainDescription: '',
  subDescription: '',
  buttonText: '',
}
