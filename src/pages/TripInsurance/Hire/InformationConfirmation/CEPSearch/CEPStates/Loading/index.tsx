import React from 'react'
import * as s from '../styles'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'

const Loading = () => (
  <>
    <s.LinkCEPWrapper>
      <ButtonLink noIcon>
        <Text bold type="button" color="blue4" textTransform="uppercase">
          Não sabe o CEP?
        </Text>
      </ButtonLink>
      <s.CEPStateWrapper>
        <s.LoadingWrapper>
          <s.Loading type="spinner" width={28} legend="Aguarde" />
        </s.LoadingWrapper>
        <Text type="subheading" bold color="gray4" textTransform="uppercase">
          Aguarde
        </Text>
      </s.CEPStateWrapper>
    </s.LinkCEPWrapper>
  </>
)

export default Loading
