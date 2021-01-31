import React from 'react'
import useZipCodeFetch from 'hooks/ZipCode/useZipCodeFetch'
import { brazilianStates } from 'pages/CreditCard/Creation/CreditCardStep/Selects/BrazilianStates/types'
import * as s from './styles'
import {
  errorCEP,
  isInvalidCEP,
  validationInputError,
} from 'pages/CreditCard/Creation/CreditCardStep/validators'
import { IPassengerAddress } from 'pages/TripInsurance/Creation/types'
import { dict } from 'components/IconExporter'

interface IFormAddres {
  cep: boolean
  streetAddress: boolean
  number: boolean
  additionalInfo: boolean
  neighbourhood: boolean
  city: boolean
  stateOption: boolean
}

interface IAddressForm {
  addressData: [
    IPassengerAddress,
    React.Dispatch<React.SetStateAction<IPassengerAddress>>
  ]
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

const AddressForm: React.FC<IAddressForm> = ({
  addressData: [addressData, setAddressData],
}: IAddressForm) => {
  const {
    data: zipCode,
    searchZipCode,
    isLoading,
    hasError,
  } = useZipCodeFetch()

  const [cep, setCep] = React.useState<string>('')
  const [stateSelect, setStateSelect] = React.useState({
    id: 0,
    name: 'Selecione',
  })

  const [touched, setTouched] = React.useState<IFormAddres>({
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

      setStateSelect({ id: 99, name: uf })
      setAddressData({
        tipo: tipoLogradouro,
        bairro,
        cidade,
        uf,
        logradouro: `${tipoLogradouro}. ${logradouro}`,
        numeroCep: cep,
        complementoCep: complementoCep,
      })
    }
  }, [zipCode, setAddressData])

  React.useEffect(() => {
    if (cep && cep.length === 9) {
      if (isLoading || hasError) {
        setAddressData({
          numeroCep: cep.slice(0, 5),
          complementoCep: cep.slice(-3),
          bairro: '',
          cidade: '',
          uf: '',
          logradouro: '',
          numero: '',
        })
        setStateSelect({
          id: 0,
          name: 'Selecione',
        })
        setTouched({
          cep: false,
          streetAddress: false,
          number: false,
          additionalInfo: false,
          neighbourhood: false,
          city: false,
          stateOption: false,
        })
      }
    }
  }, [isLoading, hasError, setAddressData, cep])

  const setFormAddress = (value: string, key: EAddressForm) => {
    setAddressData({
      ...addressData,
      [key]: value,
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
    setCep(e.currentTarget.value || '')
    searchZipCode(e.currentTarget.value)
    if (e.currentTarget.value && e.currentTarget.value.length === 9) {
      setFormAddress(e.currentTarget.value.slice(0, 5), 'numeroCep')
      setFormAddress(e.currentTarget.value.slice(-3), 'complementoCep')
    } else {
      setFormAddress('', 'numeroCep')
      setFormAddress('', 'complementoCep')
    }
  }

  const errorResponseCep = () => {
    if (isInvalidCEP(cep, touched.cep)) {
      return errorCEP(cep)
    }

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
      <s.CEPInput
        label="CEP"
        error={errorResponseCep()}
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
        disabled={isLoading}
        onChange={handlerOnChangeZipCode}
        placeholder="Busca por CEP"
      />
      {isFormAddress && (
        <>
          <s.TextInput
            label="Endereço"
            value={addressData.logradouro}
            disabled={isLoading}
            onBlur={() => touch('streetAddress')}
            error={validationInputError(
              addressData.logradouro,
              touched.streetAddress
            )}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFormAddress(e.currentTarget.value, 'logradouro')
            }
            placeholder="Digite aqui"
          />
          <s.InputWrapper>
            <s.TextInput
              label="Número"
              value={addressData.numero}
              disabled={isLoading}
              onBlur={() => touch('number')}
              error={validationInputError(addressData.numero, touched.number)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setFormAddress(e.currentTarget.value, 'numero')
              }
              placeholder="Digite aqui"
            />
            <s.ComplementTextInput
              label="Complemento (opcional)"
              value={addressData.complemento}
              disabled={isLoading}
              placeholder="Digite aqui"
              onChange={e =>
                setFormAddress(e.currentTarget.value, 'complemento')
              }
            />
          </s.InputWrapper>
          <s.TextInput
            label="Bairro"
            value={addressData.bairro}
            disabled={isLoading}
            onBlur={() => touch('neighbourhood')}
            error={validationInputError(
              addressData.bairro,
              touched.neighbourhood
            )}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setFormAddress(e.currentTarget.value, 'bairro')
            }
            placeholder="Digite aqui"
          />
          <s.InputWrapper>
            <s.Select
              label="Estado"
              disabled={isLoading}
              options={statusOption()}
              selected={stateSelect}
            />
            <s.CityTextInput
              label="Cidade"
              value={addressData.cidade}
              onBlur={() => touch('city')}
              disabled={isLoading}
              error={validationInputError(addressData.cidade, touched.city)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setFormAddress(e.currentTarget.value, 'cidade')
              }
              placeholder="Digite aqui"
            />
          </s.InputWrapper>
        </>
      )}
    </>
  )
}

export default AddressForm
