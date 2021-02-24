import React from 'react'
import useZipCodeFetch from 'hooks/ZipCode/useZipCodeFetch'
import { dict } from 'components/IconExporter'
import { statusOption } from './utils'
import { IAddressForm } from './types'

import * as s from './styles'

const AddressForm: React.FC<IAddressForm> = ({
  cep: [cep, setCep],
  type: [, setType],
  streetAddress: [streetAddress, setStreetAddress],
  number: [number, setNumber],
  complement: [complement, setComplement],
  neighbourhood: [neighbourhood, setNeighbourhood],
  city: [city, setCity],
  state: [state, setState],
}: IAddressForm) => {
  const {
    data: zipCode,
    searchZipCode,
    isLoading,
    hasError,
  } = useZipCodeFetch()

  React.useEffect(() => {
    if (!zipCode.hasError && zipCode.data) {
      const { bairro, logradouro, cidade, uf, tipoLogradouro } = zipCode.data
      setStreetAddress(`${tipoLogradouro} ${logradouro}`)
      setState({ id: 99, name: uf })
      setCity(cidade)
      setNeighbourhood(bairro)
      setType(tipoLogradouro || 'Rua')
    }
  }, [zipCode, setStreetAddress, setState, setCity, setNeighbourhood, setType])

  React.useEffect(() => {
    if (cep && cep.length === 9) {
      searchZipCode(cep)
    }
  }, [cep, searchZipCode])

  React.useEffect(() => {
    if (isLoading || hasError) {
      setStreetAddress('')
      setState({ id: 0, name: '' })
      setCity('')
      setNumber('')
      setComplement('')
      setNeighbourhood('')
      setType('Rua')
    }
  }, [
    isLoading,
    hasError,
    setStreetAddress,
    setState,
    setCity,
    setNumber,
    setComplement,
    setNeighbourhood,
    setType,
  ])

  const errorResponseCep = () => {
    if (hasError) {
      return {
        icon: 'information' as keyof typeof dict,
        message:
          'CEP não localizado. Por favor, preencha o endereço manualmente.',
      }
    }

    return undefined
  }

  const isFormAddress: boolean = !!zipCode.data || hasError

  return (
    <>
      <s.WrapperZipcodeInput space={errorResponseCep() ? false : isFormAddress}>
        <s.CEPInput
          label="CEP"
          error={errorResponseCep()}
          suffix={
            isLoading ? (
              <s.LoadingWrapper>
                <s.Loading type="spinner" />
              </s.LoadingWrapper>
            ) : (
              <s.SearchIcon name="search" />
            )
          }
          value={cep}
          disabled={isLoading}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCep(e.currentTarget.value)
          }
          placeholder="Busca por CEP"
        />
      </s.WrapperZipcodeInput>
      {isFormAddress ? (
        <>
          <s.TextInput
            label="Endereço"
            value={streetAddress}
            disabled={isLoading}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setStreetAddress(e.currentTarget.value)
            }
            placeholder="Digite aqui"
          />
          <s.InputWrapper>
            <s.TextInput
              label="Número"
              value={number}
              disabled={isLoading}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setNumber(e.currentTarget.value)
              }
              placeholder="Digite aqui"
            />
            <s.ComplementTextInput
              label="Complemento (opcional)"
              value={complement}
              disabled={isLoading}
              placeholder="Digite aqui"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setComplement(e.currentTarget.value)
              }
            />
          </s.InputWrapper>
          <s.TextInput
            label="Bairro"
            value={neighbourhood}
            disabled={isLoading}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setNeighbourhood(e.currentTarget.value)
            }
            placeholder="Digite aqui"
          />
          <s.InputWrapper>
            <s.Select
              label="Estado"
              disabled={isLoading}
              options={statusOption(setState)}
              selected={state}
            />
            <s.CityTextInput
              label="Cidade"
              value={city}
              disabled={isLoading}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setCity(e.currentTarget.value)
              }
              placeholder="Digite aqui"
            />
          </s.InputWrapper>
        </>
      ) : null}
    </>
  )
}

export default AddressForm
