import React, { useState } from 'react'
import useZipCodeFetch from 'hooks/ZipCode/useZipCodeFetch'
import { brazilianStates } from 'pages/CreditCard/Creation/CreditCardStep/Selects/BrazilianStates/types'
import * as s from './styles'
import {
  errorCEP,
  isInvalidCEP,
} from 'pages/CreditCard/Creation/CreditCardStep/validators'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { IForm } from 'pages/TripInsurance/Creation/types'

interface IFormAddres {
  cep: boolean
  streetAddress: boolean
  number: boolean
  additionalInfo: boolean
  neighbourhood: boolean
  city: boolean
  stateOption: boolean
}

type EAddressForm =
  | 'tipo'
  | 'logradouro'
  | 'bairro'
  | 'cidade'
  | 'uf'
  | 'complemento'
  | 'numero'
  | 'numeroCep'
  | 'complementoCep'

const AddressForm: React.FC = () => {
  const { form, updateForm } = useFormFluxManagement<IForm>()
  const [hasError, setHasError] = useState(false)
  const { data: zipCode, searchZipCode, isLoading } = useZipCodeFetch()
  const [cep, setCep] = useState('')
  const [streetAddress, setStreetAddress] = useState<string>()
  const [stateSelect, setStateSelect] = useState({ id: 0, name: 'Selecione' })
  const [touched, setTouched] = useState<IFormAddres>({
    cep: false,
    streetAddress: false,
    number: false,
    additionalInfo: false,
    neighbourhood: false,
    city: false,
    stateOption: false,
  })
  const touch = (key: string) => {
    setTouched((touched: IFormAddres) => ({
      ...touched,
      [key]: true,
    }))
  }

  React.useEffect(() => {
    setHasError(zipCode.hasError)

    if (!zipCode.hasError && zipCode.data) {
      const {
        bairro,
        logradouro,
        cidade,
        uf,
        tipoLogradouro,
        cep,
        complementoCep,
      } = zipCode.data

      setStreetAddress(`${tipoLogradouro}. ${logradouro}`)
      setStateSelect({ id: 99, name: uf })

      updateForm({
        ...form,
        passageiroPrincipal: {
          ...form.passageiroPrincipal,
          endereco: {
            tipo: tipoLogradouro,
            bairro,
            cidade,
            uf,
            logradouro,
            numeroCep: cep,
            complementoCep: complementoCep,
          },
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipCode])

  const setFormAddress = (value: string, key: EAddressForm) => {
    updateForm({
      ...form,
      passageiroPrincipal: {
        ...form.passageiroPrincipal,
        endereco: {
          ...form.passageiroPrincipal?.endereco,
          tipo: 'Rua',
          [key]: value,
        },
      },
    })
  }

  const statusOption = () =>
    brazilianStates.map((value, index) => ({
      id: index,
      text: value,
      onClick: () => {
        setStateSelect({ id: index, name: value })
        setFormAddress(value, 'uf')
      },
    }))

  const handlerOnChangeZipCode = (e: React.FormEvent<HTMLInputElement>) => {
    setCep(e.currentTarget.value)
    searchZipCode(e.currentTarget.value)
  }

  const handlerStreetAddress = (e: React.FormEvent<HTMLInputElement>) => {
    setStreetAddress(e.currentTarget.value)
    setFormAddress(e.currentTarget.value, 'logradouro')
  }

  return (
    <>
      <s.CEPInput
        label="CEP"
        error={isInvalidCEP(cep, touched.cep) && errorCEP(cep)}
        onBlur={() => touch('cep')}
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
        onChange={handlerOnChangeZipCode}
        placeholder="Busca por CEP"
      />
      <s.StatusWrapper>
        {hasError && (
          <>
            <s.ErrorIcon name="alertrounded" color="magenta2" />
            <s.Text bold color="magenta2">
              CEP não localizado. Por favor, preencha o endereço manualmente.
            </s.Text>
          </>
        )}
      </s.StatusWrapper>
      {zipCode?.data && (
        <>
          <s.TextInput
            label="Endereço"
            value={streetAddress}
            onChange={handlerStreetAddress}
            placeholder="Digite aqui"
          />
          <s.InputWrapper>
            <s.TextInput
              label="Número"
              value={form.passageiroPrincipal?.endereco?.numero}
              onChange={e => setFormAddress(e.currentTarget.value, 'numero')}
              placeholder="Digite aqui"
            />
            <s.ComplementTextInput
              label="Complemento (opcional)"
              value={form.passageiroPrincipal?.endereco?.complemento}
              placeholder="Digite aqui"
              onChange={e =>
                setFormAddress(e.currentTarget.value, 'complemento')
              }
            />
          </s.InputWrapper>
          <s.TextInput
            label="Bairro"
            value={form.passageiroPrincipal?.endereco?.bairro}
            onChange={e => setFormAddress(e.currentTarget.value, 'bairro')}
            placeholder="Digite aqui"
          />
          <s.InputWrapper>
            <s.Select
              label="Estado"
              options={statusOption()}
              selected={stateSelect}
            />
            <s.CityTextInput
              label="Cidade"
              value={form.passageiroPrincipal?.endereco?.cidade}
              onChange={e => setFormAddress(e.currentTarget.value, 'cidade')}
              placeholder="Digite aqui"
            />
          </s.InputWrapper>
        </>
      )}
    </>
  )
}

export default AddressForm
