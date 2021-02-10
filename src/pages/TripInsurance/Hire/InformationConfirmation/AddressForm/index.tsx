import React from 'react'
import useZipCodeFetch from 'hooks/ZipCode/useZipCodeFetch'
import { brazilianStates } from 'pages/CreditCard/common/Selects/BrazilianStates/types'
import * as s from './styles'
import {
  errorCEP,
  isInvalidCEP,
  validationInputError,
} from 'helpers/validators'
import { IPassengerAddress } from 'pages/TripInsurance/Creation/types'
import { dict } from 'components/IconExporter'

interface IFormAddres {
  cep: boolean
  streetAddress: boolean
  neighbourhood: boolean
  city: boolean
  stateOption: boolean
}

type TInputForm = { value: string; touched: boolean }

interface IAddressForm {
  numero: [TInputForm, React.Dispatch<React.SetStateAction<TInputForm>>]
  complemento: [TInputForm, React.Dispatch<React.SetStateAction<TInputForm>>]
  addressData: [
    IPassengerAddress,
    React.Dispatch<React.SetStateAction<IPassengerAddress>>
  ]
  cep: [string, React.Dispatch<React.SetStateAction<string>>]
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
  numero: [numero, setNumero],
  complemento: [complemento, setComplemento],
  addressData: [addressData, setAddressData],
  cep: [cep, setCep],
}: IAddressForm) => {
  const {
    data: zipCode,
    searchZipCode,
    isLoading,
    hasError,
  } = useZipCodeFetch()

  const [stateSelect, setStateSelect] = React.useState({
    id: 0,
    name: 'Selecione',
  })

  const [touched, setTouched] = React.useState<IFormAddres>({
    cep: false,
    streetAddress: false,
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
        setNumero({ value: '', touched: false })
        setComplemento({ value: '', touched: false })
        setAddressData({
          numeroCep: cep.slice(0, 5),
          complementoCep: cep.slice(-3),
          bairro: '',
          cidade: '',
          uf: '',
          logradouro: '',
        })
        setStateSelect({
          id: 0,
          name: 'Selecione',
        })
        setTouched({
          cep: false,
          streetAddress: false,
          neighbourhood: false,
          city: false,
          stateOption: false,
        })
      }
    }
  }, [isLoading, hasError, setAddressData, cep, setComplemento, setNumero])

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
      setFormAddress('', 'numero')
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
              placeholder="Digite aqui"
              value={addressData.numero}
              disabled={isLoading}
              onBlur={() => touch('number')}
              error={validationInputError(numero.value, numero.touched)}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setNumero({
                  ...numero,
                  value: e.currentTarget.value,
                })
              }
            />
            <s.ComplementTextInput
              label="Complemento (opcional)"
              value={addressData.complemento}
              disabled={isLoading}
              placeholder="Digite aqui"
              onChange={e =>
                setComplemento({ value: e.target.value, touched: true })
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
