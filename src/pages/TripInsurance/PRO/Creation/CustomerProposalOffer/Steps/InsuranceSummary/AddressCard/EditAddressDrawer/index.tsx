import React from 'react'

import Drawer from 'components/Drawer'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'
import { dict } from 'components/IconExporter'
import useZipCodeFetch from 'hooks/ZipCode/useZipCodeFetch'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useMedia from 'hooks/useMedia'
import { brazilianStates } from 'pages/CreditCard/Creation/CreditCardStep/Selects/BrazilianStates/types'

import { IForm } from 'pages/TripInsurance/PRO/types'

import * as s from './styles'
import * as t from './types'

import {
  errorCEP,
  isInvalidCEP,
  validationInputError,
} from 'pages/CreditCard/Creation/CreditCardStep/validators'

const EditAddressDrawer: React.FC<t.IAddressDrawer> = ({
  isOpen,
  handleClose,
  ...rest
}) => {
  const isMobile = useMedia('sm')
  const { form, updateForm } = useFormFluxManagement<IForm>()
  const [cep, setCep] = React.useState<string>('')
  const [isValid, setIsValid] = React.useState<boolean>(false)
  const [address, setAddress] = React.useState<t.IPassengerAddress>({
    tipo: 'Rua',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
    numeroCep: '',
    complementoCep: '',
    complemento: '',
  })

  const [stateSelect, setStateSelect] = React.useState({
    id: 0,
    name: 'Selecione',
  })

  const [touched, setTouched] = React.useState<t.IFormAddress>({
    cep: false,
    streetAddress: false,
    number: false,
    neighbourhood: false,
    city: false,
    stateOption: false,
  })

  const {
    data: zipCode,
    searchZipCode,
    isLoading,
    hasError,
  } = useZipCodeFetch()

  React.useEffect(() => {
    if (
      address.bairro !== '' &&
      address.uf !== 'Selecione' &&
      address.logradouro !== '' &&
      address.numero !== '' &&
      address.cidade !== '' &&
      cep.length === 9
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [cep, address])

  React.useEffect(() => {
    setAddress(form.passageiroPrincipal?.endereco || {})
    setCep(
      form.passageiroPrincipal?.endereco?.numeroCep &&
        form.passageiroPrincipal?.endereco?.complementoCep
        ? `${form.passageiroPrincipal?.endereco?.numeroCep}-${form.passageiroPrincipal?.endereco?.complementoCep}`
        : ''
    )
    setStateSelect({
      id: 0,
      name: form.passageiroPrincipal?.endereco?.uf || 'Selecione',
    })
  }, [form.passageiroPrincipal])

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
      setAddress({
        tipo: tipoLogradouro,
        bairro,
        cidade,
        uf,
        numero: '',
        logradouro: `${tipoLogradouro}. ${logradouro}`,
        numeroCep: cep,
        complementoCep: complementoCep,
      })
    }
  }, [zipCode])

  const touch = (key: string) => {
    setTouched((touched: t.IFormAddress) => ({
      ...touched,
      [key]: true,
    }))
  }

  const footerButton = () => (
    <s.SaveChangesButton
      disabled={!isValid}
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname="alterar endereço do passageiro principal - seguro viagem - pro"
      data-gtm-name="salvar alterações"
      onClick={() => {
        updateForm({
          ...form,
          passageiroPrincipal: {
            ...form.passageiroPrincipal,
            endereco: address,
          },
        })
        handleClose()
      }}
    >
      SALVAR ALTERAÇÕES
    </s.SaveChangesButton>
  )

  const statusOption = () =>
    brazilianStates.map((value, index) => ({
      id: index,
      text: value,
      onClick: () => {
        setStateSelect({ id: index, name: value })
        setFormAddress(value, 'uf')
      },
    }))

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

  const setFormAddress = (value: string, key: t.EAddressForm) => {
    setAddress({
      ...address,
      [key]: value,
    })
  }

  const handlerOnChangeZipCode = (e: React.FormEvent<HTMLInputElement>) => {
    setCep(e.currentTarget.value || '')
    searchZipCode(e.currentTarget.value)
    setIsValid(false)
    if (e.currentTarget.value && e.currentTarget.value.length === 9) {
      setFormAddress(e.currentTarget.value.slice(0, 5), 'numeroCep')
      setFormAddress(e.currentTarget.value.slice(-3), 'complementoCep')
    } else {
      setFormAddress('', 'numeroCep')
      setFormAddress('', 'complementoCep')
      setFormAddress('', 'numero')
    }
  }

  const renderContent = () => (
    <>
      <s.ExplanationText>
        Por favor, inclua somente CEPs de endereços no Brasil. Endereços no
        exterior não são válidos.
      </s.ExplanationText>

      <s.CEPInput
        error={errorResponseCep()}
        label="CEP"
        onBlur={() => touch('cep')}
        suffix={
          isLoading ? (
            <s.LoadingWrapper>
              <Loading type="spinner" />
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
      <s.TextInput
        label="Endereço (Rua/Avenida)"
        value={address.logradouro}
        disabled={isLoading}
        onBlur={() => touch('streetAddress')}
        error={validationInputError(address.logradouro, touched.streetAddress)}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setFormAddress(e.currentTarget.value, 'logradouro')
        }
        placeholder="Digite aqui"
      />
      <s.TextInput
        label="Número"
        placeholder="Digite aqui"
        value={address.numero}
        disabled={isLoading}
        onBlur={() => touch('number')}
        error={validationInputError(address.numero, touched.number)}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setFormAddress(e.currentTarget.value, 'numero')
        }
      />
      <s.ComplementTextInput
        label="Complemento (opcional)"
        value={address.complemento}
        disabled={isLoading}
        placeholder="Digite aqui"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setFormAddress(e.currentTarget.value, 'complemento')
        }
      />
      <s.TextInput
        label="Bairro"
        value={address.bairro}
        disabled={isLoading}
        onBlur={() => touch('neighbourhood')}
        error={validationInputError(address.bairro, touched.neighbourhood)}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setFormAddress(e.currentTarget.value, 'bairro')
        }
        placeholder="Digite aqui"
      />
      <s.Select
        label="Estado"
        disabled={isLoading}
        options={statusOption()}
        selected={stateSelect}
        optionBoxDirection="top"
      />
      <s.CityTextInput
        label="Cidade"
        value={address.cidade}
        onBlur={() => touch('city')}
        disabled={isLoading}
        error={validationInputError(address.cidade, touched.city)}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setFormAddress(e.currentTarget.value, 'cidade')
        }
        placeholder="Digite aqui"
      />
    </>
  )

  if (isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        handleClose={() => handleClose()}
        modalTitle="Alterar endereço"
        footer={footerButton()}
        {...rest}
      >
        {renderContent()}
      </Modal>
    )
  }
  return (
    <Drawer
      isOpen={isOpen}
      handleClose={() => handleClose()}
      drawerTitle="Alterar endereço"
      size="sm"
      footer={footerButton()}
      {...rest}
    >
      {renderContent()}
    </Drawer>
  )
}

export default EditAddressDrawer
