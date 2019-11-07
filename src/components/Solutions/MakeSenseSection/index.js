import React from 'react'

import {
  Container,
  Title,
  ItemsContainer,
  Item,
  Circle,
  ItemDescription
} from './styles'

export default function MakeSenseSection({ title, data }) {
  return (
    <Container backgroundColor="white">
      <Title>{title}</Title>
      <ItemsContainer>
        {data.map(item => (
          <Item key={item.description}>
            <Circle>{item.icon}</Circle>
            <ItemDescription align="center">{item.description}</ItemDescription>
          </Item>
        ))}
      </ItemsContainer>
    </Container>
  )
}
