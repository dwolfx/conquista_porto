import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Button from 'components/Button'
import Text from 'components/Text'

import { LoadingStateObjectivesContainer } from '../styles'

export default function ErrorState({ onRetry, ...rest }) {
  return (
    <LoadingStateObjectivesContainer {...rest}>
      <Text
        type="headline"
        color="magenta2"
        css={`
          text-align: center;
          margin-bottom: 14px;
        `}
      >
        Desculpe, não foi possível carregar suas informações. Aguarde alguns
        instantes e tente novamente.
      </Text>
      <Button onClick={onRetry}>Tentar novamente</Button>
    </LoadingStateObjectivesContainer>
  )
}

ErrorState.propTypes = {
  onRetry: PropTypes.func,
}

ErrorState.defaultProps = {
  onRetry: () => {},
}
