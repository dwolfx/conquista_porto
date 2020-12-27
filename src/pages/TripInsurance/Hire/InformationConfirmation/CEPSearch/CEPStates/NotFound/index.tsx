import React, { useState } from 'react'
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

const CEPNotFound = () => {
  const [manualFill, setManualFill] = useState(false)
  const [showCard, setShowCard] = useState(true)

  const handleManualFillCardDisplay = () => {
    setManualFill(!manualFill)
    setShowCard(!showCard)
  }

  return (
    <>
      <s.LinkCEPWrapper>
        <ButtonLink noIcon>
          <Text bold type="button" color="blue4" textTransform="uppercase">
            Não sabe o CEP?
          </Text>
        </ButtonLink>
        <s.NotFoundMessageWrapper>
          <s.NotFoundIconWrapper>
            <s.NotFoundIcon name="alertrounded" color="magenta2" />
          </s.NotFoundIconWrapper>
          <Text color="magenta2" bold>
            CEP não localizado. Por favor, verifique e tente novamente.
          </Text>
        </s.NotFoundMessageWrapper>
      </s.LinkCEPWrapper>
      {showCard ? (
        <s.ManualFillCard>
          <s.ManualFillIconWrapper>
            <s.ManualFillIcon name="alertrounded" color="gray4" />
          </s.ManualFillIconWrapper>
          <s.ManualFillCardTextWrapper>
            <s.ManualFillCardText type="title" bold>
              Problemas para encontrar seu CEP?
            </s.ManualFillCardText>
            <ButtonLink noIcon onClick={() => handleManualFillCardDisplay()}>
              <Text bold type="button" color="blue4" textTransform="uppercase">
                preencha o endereço manualmente
              </Text>
            </ButtonLink>
          </s.ManualFillCardTextWrapper>
        </s.ManualFillCard>
      ) : null}

      {manualFill ? (
        <>
          <s.ManualFillTextWrapper>
            <s.ManualFillText type="title" color="gray5" bold>
              Preenchimento manual de endereço
            </s.ManualFillText>
            <ButtonLink noIcon onClick={() => handleManualFillCardDisplay()}>
              <Text bold type="button" color="blue4" textTransform="uppercase">
                cancelar
              </Text>
            </ButtonLink>
          </s.ManualFillTextWrapper>

          <s.AddressInput
            label="Endereço (Rua/Avenida)"
            value="Avenida Paulista"
          />
          <s.NumberComplementWrapper>
            <s.TextInput label="Número" value="987" />
            <s.TextInputComplement
              label="Complemento (opcional)"
              value="Apto 98"
            />
          </s.NumberComplementWrapper>
          <s.CityInput label="Cidade" value="São Paulo" />
          <s.TextInput label="Bairro" value="Cerqueira César" />
          <s.Select
            label="Estado"
            options={statesOptions}
            selected={selected}
          />
        </>
      ) : null}
    </>
  )
}

export default CEPNotFound
