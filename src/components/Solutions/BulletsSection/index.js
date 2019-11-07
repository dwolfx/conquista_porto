import React from 'react'

import { Container, Content, LeftContent, RightContent } from './styles'

export default function BulletsSection({
  imageURL,
  imageDescription,
  title,
  data
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
        </RightContent>
      </Content>
    </Container>
  )
}
