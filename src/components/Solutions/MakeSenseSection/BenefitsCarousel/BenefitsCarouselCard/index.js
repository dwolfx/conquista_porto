import React from 'react'
import PropTypes from 'prop-types'
import ConquistaIcon from 'components/IconExporter'
import { CardWrapper, Title, Description, TextBox } from './styles'

const BenefitsCarouselCard = ({ title, description, icon }) => (
  <CardWrapper>
    <ConquistaIcon name={icon} />
    <TextBox>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </TextBox>
  </CardWrapper>
)

BenefitsCarouselCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default BenefitsCarouselCard
