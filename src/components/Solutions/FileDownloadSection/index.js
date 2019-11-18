import React from 'react'

import {
  Container,
  Item,
  PDFIconStyled,
  Title,
  Description,
  DownloadLink
} from './styles'

export default function FileDownloadSection({ data }) {
  return (
    <Container>
      {data.map(item => (
        <Item key={item.title}>
          <div>
            <PDFIconStyled fill="#777" height="24px" />
          </div>
          <div>
            <Title>{item.title}</Title>
            <Description align="left">{item.description}</Description>
            <DownloadLink>{item.buttonText} &gt; </DownloadLink>
          </div>
        </Item>
      ))}
    </Container>
  )
}
