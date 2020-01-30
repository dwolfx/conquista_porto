import React from 'react'
import PropTypes from 'prop-types'
import BenefitsCarousel, {
  propTypes as propTypesBenefits,
} from './BenefitsCarousel'

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

MakeSenseSection.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
  subtitle: PropTypes.string,
  benefitsData: propTypesBenefits,
}

MakeSenseSection.defaultProps = {
  title: '',
  data: [],
  subtitle: '',
  benefitsData: [],
}
