import React from 'react'
import * as s from '../styles'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import * as t from 'components/Inputs/Select/types'

const statesOptions: t.TOptions[] = [
  {
    id: 1,
    text: 'SP',
  },
  {
    id: 2,
    text: 'RJ',
  },
  {
    id: 3,
    text: 'MG',
  },
]

const selected: t.TSelected = {
  id: 0,
}

const CEPManualInput = () => (
  <>
    <s.ManualFillTextWrapper>
      <s.ManualFillText type="title" color="gray5" bold>
        Preenchimento manual de endereço
      </s.ManualFillText>
      <ButtonLink noIcon>
        <Text bold type="button" color="blue4" textTransform="uppercase">
          cancelar
        </Text>
      </ButtonLink>
    </s.ManualFillTextWrapper>

    <s.AddressInput label="Endereço (Rua/Avenida)" value="Avenida Paulista" />
    <s.NumberComplementWrapper>
      <s.TextInput label="Número" value="987" />
      <s.TextInputComplement label="Complemento (opcional)" value="Apto 98" />
    </s.NumberComplementWrapper>
    <s.CityInput label="Cidade" value="São Paulo" />
    <s.TextInput label="Bairro" value="Cerqueira César" />
    <s.Select label="Estado" options={statesOptions} selected={selected} />
  </>
)

export default CEPManualInput
