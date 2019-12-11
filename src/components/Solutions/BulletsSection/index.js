import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ThemeContext } from 'styled-components'

import {
  Container,
  Content,
  LeftContent,
  RightContent,
  Observation,
} from './styles'

export default function BulletsSection({
  imageURL,
  imageDescription,
  title,
  data,
  observation,
}) {
  const themeContext = useContext(ThemeContext)

  return (
    <Container backgroundColor={themeContext.colors.gray1}>
      <Content>
        <LeftContent>
          <img src={imageURL} alt={imageDescription} />
        </LeftContent>
        <RightContent>
          <div>{title}</div>
          <ul>
            {data.map(text => (
              <li key={text}>{text}</li>
            ))}
          </ul>
          <Observation>{observation}</Observation>
        </RightContent>
      </Content>
    </Container>
  )
}

BulletsSection.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageDescription: PropTypes.string,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  observation: PropTypes.string,
}
BulletsSection.defaultProps = {
  imageDescription: '',
  observation: '',
}
