import React from 'react'
import { IBenefitsData } from '../index'
import { CardWrapper, Title, Description, TextBox } from './styles'
import ConquistaIcon from '../../../../IconExporter';

export default function({ title, description, icon }: IProps) {
  return (
    <CardWrapper>
      <ConquistaIcon name={icon}/>
      <TextBox>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextBox>
    </CardWrapper>
  )
}

interface IProps extends IBenefitsData {}
