import React from 'react'
import Button from 'components/Button'
import Text from 'components/Text'

import { CardInfo, Title, Subtitle } from '../styles'

interface EmptyStateContent {
  title: string
  subtitle: string
  buttonText: string
}

const CardInfoItem = ({ title, subtitle, buttonText }: EmptyStateContent) => {
  return (
    <CardInfo>
      <Title>
        <Text type="headline">{title}</Text>
      </Title>
      <Subtitle>
        <Text type="body">{subtitle}</Text>
      </Subtitle>
      <Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-subname="Cartao de credito"
        data-gtm-name="botao cartao de credito"
        color="secondary"
        onClick={() => {}}
      >
        {buttonText}
      </Button>
    </CardInfo>
  )
}

export default CardInfoItem
