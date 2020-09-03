import React from 'react'
import { useHistory } from 'react-router-dom'

import Button from 'components/Button'
import Text from 'components/Text'
import IconExporter from 'components/IconExporter'

import { HorizontalListStyled } from './styles'
import { CreditCardInfo } from '../types'
import { CardInfo, Title } from '../styles'

const CreditCardContent = ({
  flag,
  title,
  path,
  valor
}: Omit<CreditCardInfo, 'type'>) => {
  const history = useHistory()
  return (
    <CardInfo>
      <Title> 
        <Text type="headline">{title}</Text>
      </Title>
      <HorizontalListStyled
        noPadding
        size="medium"
        startItems={[
          <Text type="captionUppercase" bold color="gray5">limite disponível</Text>,
        ]}
        endItems={[
          <IconExporter name={flag || 'creditcard'} width="25" />,
          <Text type="body" bold>{valor}</Text>,
        ]}
      />
      <Button
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-subname="Cartao de credito"
        data-gtm-name="botao cartao de credito"
        color="primary"
        outline
        onClick={() => history.push(path)}
      >
        gerenciar
      </Button>
    </CardInfo>
  )
}

export default CreditCardContent
