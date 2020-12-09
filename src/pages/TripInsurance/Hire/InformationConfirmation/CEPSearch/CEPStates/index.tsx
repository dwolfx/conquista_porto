import React from 'react'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import * as s from './styles'
import * as t from 'components/Inputs/Select/types'

interface ICEPStates {
  isLoading: boolean
  isFound: boolean
  isPartiallyFound: boolean
  isNotFound: boolean
}

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

const CEPLoading = () => (
  <s.LinkCEPWrapper>
    <s.CEPStateWrapper>
      <s.LoadingWrapper>
        <s.Loading type="spinner" width={28} legend="Aguarde" />
      </s.LoadingWrapper>
      <Text type="subheading" bold color="gray4" textTransform="uppercase">
        Aguarde
      </Text>
    </s.CEPStateWrapper>
    <ButtonLink noIcon>
      <Text bold type="button" color="blue4" textTransform="uppercase">
        Não sabe o CEP?
      </Text>
    </ButtonLink>
  </s.LinkCEPWrapper>
)

const CEPFound = () => (
  <>
    <s.LinkCEPWrapper>
      <s.AddressWrapper>
        <Text bold>Av. Paulista - Cerqueira César</Text>
        <Text bold>São Paulo - SP</Text>
      </s.AddressWrapper>
      <ButtonLink noIcon>
        <Text bold type="button" color="blue4" textTransform="uppercase">
          Não sabe o CEP?
        </Text>
      </ButtonLink>
    </s.LinkCEPWrapper>
    <s.NumberComplementWrapper>
      <s.TextInputNumber label="Número" value="987" />
      <s.TextInputComplement label="Complemento" value="Apto 98" />
    </s.NumberComplementWrapper>
  </>
)

const CEPPartiallyFound = () => (
  <>
    <s.LinkCEPWrapper>
      <s.AddressWrapper>
        <Text bold>Águas de São Pedro / SP</Text>
      </s.AddressWrapper>
      <ButtonLink noIcon>
        <Text bold type="button" color="blue4" textTransform="uppercase">
          Não sabe o CEP?
        </Text>
      </ButtonLink>
    </s.LinkCEPWrapper>
    <s.NumberComplementWrapper>
      <s.TextInputNumber label="Número" value="987" />
      <s.TextInputComplement label="Complemento" value="Apto 98" />
    </s.NumberComplementWrapper>
    <s.TextInput label="Bairro" value="Cerqueira César" />
  </>
)

const CEPNotFound = () => (
  <>
    <s.CEPNotFoundWrapper>
      <s.LinkCEPWrapper>
        <s.NotFoundMessageWrapper>
          <s.NotFoundIconWrapper>
            <s.NotFoundIcon name="alertrounded" color="magenta2" />
          </s.NotFoundIconWrapper>
          <Text color="magenta2" bold>
            CEP não localizado. Por favor, verifique e tente novamente.
          </Text>
        </s.NotFoundMessageWrapper>
        <ButtonLink noIcon>
          <Text bold type="button" color="blue4" textTransform="uppercase">
            Não sabe o CEP?
          </Text>
        </ButtonLink>
      </s.LinkCEPWrapper>
      <s.ManualFillCard>
        <s.ManualFillIconWrapper>
          <s.ManualFillIcon name="alertrounded" color="gray4" />
        </s.ManualFillIconWrapper>
        <s.ManualFillCardTextWrapper>
          <s.ManualFillCardText type="title" bold>
            Problemas para encontrar seu CEP?
          </s.ManualFillCardText>
          <ButtonLink noIcon>
            <Text bold type="button" color="blue4" textTransform="uppercase">
              preencha o endereço manualmente
            </Text>
          </ButtonLink>
        </s.ManualFillCardTextWrapper>
      </s.ManualFillCard>
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
    </s.CEPNotFoundWrapper>
    <s.TextInput label="Endereço (Rua/Avenida)" value="Avenida Paulista" />
    <s.NumberComplementWrapper>
      <s.TextInputNumber label="Número" value="987" />
      <s.TextInputComplement label="Complemento" value="Apto 98" />
    </s.NumberComplementWrapper>
    <s.TextInput label="Cidade" value="São Paulo" />
    <s.TextInput label="Bairro" value="Cerqueira César" />
    <s.Select label="Estado" options={statesOptions} selected={selected} />
  </>
)

const CEPStates = ({
  isLoading,
  isFound,
  isPartiallyFound,
  isNotFound,
}: ICEPStates) => {
  switch (true) {
    case isLoading:
      return <CEPLoading />
    case isFound:
      return <CEPFound />
    case isPartiallyFound:
      return <CEPPartiallyFound />
    case isNotFound:
      return <CEPNotFound />
    default:
      return null
  }
}

export default CEPStates
