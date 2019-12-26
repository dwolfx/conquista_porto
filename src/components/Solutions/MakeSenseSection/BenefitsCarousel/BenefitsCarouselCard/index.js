import React from 'react'
import ConquistaIcon from 'components/IconExporter'
import { CardWrapper, Title, Description, TextBox } from './styles'

export default function({ title, description, icon }) {
  return (
    <CardWrapper>
      <ConquistaIcon name={icon} />
      <TextBox>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextBox>
    </CardWrapper>
  )
}
