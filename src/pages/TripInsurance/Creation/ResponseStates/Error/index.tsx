import React from 'react'
import Text from 'components/Text'
import * as s from '../styles'

const ErrorContent = () => (
  <s.Container>
    <Text color="magenta2" type="headline" textAlign="center">
      Desculpe, não foi possível carregar suas informações. Aguarde alguns
      instantes e tente novamente.
    </Text>
    <s.TryAgainButton
      color="primary"
      data-testid="proposal-summary-try-again-button"
      data-gtm-subname="botao tentar novamente proposta"
      data-gtm-name="botao tentar novamente"
      data-gtm-type="click"
      data-gtm-clicktype="button"
    >
      TENTAR NOVAMENTE
    </s.TryAgainButton>
  </s.Container>
)

export default ErrorContent
