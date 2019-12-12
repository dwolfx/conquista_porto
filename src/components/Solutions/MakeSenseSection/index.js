import React from 'react'
import BenefitsCarousel from './BenefitsCarousel'

import ConquistaIcon from '../../IconExporter'

import {
  Container,
  Title,
  ItemsContainer,
  Item,
  Circle,
  ItemDescription,
  Subtitle,
} from './styles'

export default function MakeSenseSection({
  title,
  data,
  subtitle,
  benefitsData,
}) {
  return (
    <Container backgroundColor="white">
      <Title>{title}</Title>
      <ItemsContainer>
        {data.map(item => (
          <Item key={item.description}>
            <Circle>
              <ConquistaIcon name={item.icon} />{' '}
            </Circle>
            <ItemDescription align="center">{item.description}</ItemDescription>
          </Item>
        ))}
      </ItemsContainer>
      <Subtitle>{subtitle}</Subtitle>
      <BenefitsCarousel benefitsData={benefitsData}></BenefitsCarousel>
    </Container>
  )
}
