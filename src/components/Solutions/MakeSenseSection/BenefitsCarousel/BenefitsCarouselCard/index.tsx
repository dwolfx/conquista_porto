import React from 'react'
import { IBenefitsData } from '../index'
import { CardWrapper, Title, Description, TextBox, Phone } from './styles'

export default function({ title, description }: IProps) {
  return (
    <CardWrapper>
      <Phone />
      <TextBox>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextBox>
    </CardWrapper>
  )
}

interface IProps extends IBenefitsData {}
