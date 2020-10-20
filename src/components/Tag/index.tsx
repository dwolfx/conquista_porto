import React from 'react'

import { Container, Text } from './styles'

interface IProps {
  color: 'blue' | 'green' | 'gray'
  text: string
}
const Tag = ({ color, text }: IProps) => {
  return (
    <Container 
      data-testid="tag-id"
      color={color}>
      <Text>{text}</Text>
    </Container>
  )
}

export default Tag
