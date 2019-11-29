import React from 'react'
import PropTypes from 'prop-types'

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
  return (
    <Container backgroundColor="#f1f1f1">
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
