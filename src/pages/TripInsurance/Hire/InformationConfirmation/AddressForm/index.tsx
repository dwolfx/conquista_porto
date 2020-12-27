import React, { useState } from 'react'
import * as s from './styles'
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

const LoadingStatus = () => (
  <>
    <s.LoadingWrapper>
      <s.Loading type="spinner" />
    </s.LoadingWrapper>
    <s.Text bold type="subheading" color="gray4">
      BUSCANDO ENDEREÇO
    </s.Text>
  </>
)

const ErrorStatus = () => (
  <>
    <s.ErrorIcon name="alertrounded" color="magenta2" />
    <s.Text bold color="magenta2">
      CEP não localizado. Por favor, preencha o endereço manualmente.
    </s.Text>
  </>
)

const AddressForm = () => {
  const [hasError] = useState(false)
  const [isLoading] = useState(false)

  const renderStatus = () => {
    if (hasError) {
      return <ErrorStatus />
    } else if (isLoading) {
      return <LoadingStatus />
    }
    return null
  }

  return (
    <>
      <s.CEPInput
        label="CEP"
        onChange={() => null}
        suffix={<s.SearchIcon name="search" />}
        value=""
        placeholder="Busca por CEP"
      />
      <s.StatusWrapper>{renderStatus()}</s.StatusWrapper>
      <s.TextInput label="Endereço" value="" placeholder="Digite aqui" />
      <s.InputWrapper>
        <s.TextInput label="Número" value="" placeholder="Digite aqui" />
        <s.ComplementTextInput
          label="Complemento (opcional)"
          value=""
          placeholder="Digite aqui"
        />
      </s.InputWrapper>
      <s.TextInput label="Bairro" value="" placeholder="Digite aqui" />
      <s.InputWrapper>
        <s.Select label="Estado" options={statesOptions} selected={selected} />
        <s.CityTextInput label="Cidade" value="" placeholder="Digite aqui" />
      </s.InputWrapper>
    </>
  )
}

export default AddressForm
