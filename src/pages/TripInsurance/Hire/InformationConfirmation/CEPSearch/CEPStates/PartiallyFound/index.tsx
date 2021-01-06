import React from 'react'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import * as s from '../styles'

const PartiallyFound = () => (
  <>
    <s.LinkCEPWrapper>
      <ButtonLink noIcon>
        <Text bold type="button" color="blue4" textTransform="uppercase">
          Não sabe o CEP?
        </Text>
      </ButtonLink>
      <s.CityText bold>Águas de São Pedro / SP</s.CityText>
    </s.LinkCEPWrapper>
    <s.AddressInput label="Endereço (Rua/Avenida)" value="Avenida Paulista" />
    <s.NumberComplementWrapper>
      <s.TextInput label="Número" value="987" />
      <s.TextInputComplement label="Complemento (opcional)" value="Apto 98" />
    </s.NumberComplementWrapper>
    <s.NeighbourhoodInput label="Bairro" value="Cerqueira César" />
  </>
)

export default PartiallyFound
