import React from 'react'
import Text from 'components/Text'
import Button from 'components/Button'
import * as s from '../styles'

const EmptyContent = () => {
  return (
    <s.Container>
      <Text type="headline" textAlign="center">
        Desculpe, no momento não temos um plano adequado para sua viagem.
      </Text>
      <s.ButtonWrapper>
        <Button
          color="primary"
          outline={true}
          data-gtm-subname="botao simular novamente seguro viagem"
          data-gtm-name="botao simular novamente"
          data-gtm-type="click"
          data-gtm-clicktype="button"
        >
          SIMULAR NOVAMENTE
        </Button>
        <s.HomeButton
          color="primary"
          data-gtm-subname="botao inicio seguro viagem"
          data-gtm-name="botao inicio"
          data-gtm-type="click"
          data-gtm-clicktype="button"
        >
          INÍCIO
        </s.HomeButton>
      </s.ButtonWrapper>
    </s.Container>
  )
}

export default EmptyContent
