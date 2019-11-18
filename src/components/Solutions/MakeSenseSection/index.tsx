import React from 'react'
import BenefitsCarousel, { IBenefitsData } from './BenefitsCarousel'

import ConquistaIcon from '../../IconExporter';

import {
  Container,
  Title,
  ItemsContainer,
  Item,
  Circle,
  ItemDescription,
  Subtitle
} from './styles'

export default function MakeSenseSection({
  title,
  data,
  subtitle,
  benefitsData
}: IProps) {
  return (
    <Container backgroundColor="white">
      <Title>{title}</Title>
      <ItemsContainer>
        {data.map(item => (
          <Item key={item.description}>
            <Circle> <ConquistaIcon name={item.icon}/> </Circle>
            <ItemDescription align="center">{item.description}</ItemDescription>
          </Item>
        ))}
      </ItemsContainer>
      <Subtitle>{subtitle}</Subtitle>
      <BenefitsCarousel benefitsData={benefitsData}></BenefitsCarousel>
    </Container>
  )
}

interface IProps extends JSX.Element {
  title: string
  data: IMakeSenseContent[]
  subtitle: string
  benefitsData: IBenefitsData[]
}

interface IMakeSenseContent {
  description: string
  icon: string
}
