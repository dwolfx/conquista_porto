import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'components/Button'
import Text from 'components/Text'

import { CardInfo, Title, Subtitle } from '../styles'

interface EmptyStateContent {
  title: string
  subtitle: string
  buttonText: string
  path: string
}

const CardInfoItem = ({
  title,
  subtitle,
  buttonText,
  path,
}: EmptyStateContent) => {
  const history = useHistory()

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
        onClick={() => history.push(`${path}`)}
      >
        {buttonText}
      </Button>
    </CardInfo>
  )
}

export default CardInfoItem
