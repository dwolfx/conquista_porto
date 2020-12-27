import React from 'react'
import * as s from '../styles'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'

const CEPFound = () => (
  <>
    <s.LinkCEPWrapper>
      <ButtonLink noIcon>
        <Text bold type="button" color="blue4" textTransform="uppercase">
          Não sabe o CEP?
        </Text>
      </ButtonLink>
      <s.AddressWrapper>
        <Text bold>Av. Paulista - Cerqueira César</Text>
        <Text bold>São Paulo - SP</Text>
      </s.AddressWrapper>
    </s.LinkCEPWrapper>
    <s.NumberComplementWrapper>
      <s.TextInput label="Número" value="987" />
      <s.TextInputComplement label="Complemento (opcional)" value="Apto 98" />
    </s.NumberComplementWrapper>
  </>
)

export default CEPFound
