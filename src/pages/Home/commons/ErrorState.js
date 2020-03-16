import React from 'react'
import PropTypes from 'prop-types'
import 'styled-components/macro'

import Button from 'components/Button'
import Text from 'components/Text'

import { LoadingStateObjectivesContainer } from '../styles'

export default function ErrorState({ onRetry }) {
  return (
    <LoadingStateObjectivesContainer>
      <Text
        type="headline"
        color="magenta2"
        css={`
          margin-bottom: 14px;
        `}
      >
        Não foi possível carregar suas informações.
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
