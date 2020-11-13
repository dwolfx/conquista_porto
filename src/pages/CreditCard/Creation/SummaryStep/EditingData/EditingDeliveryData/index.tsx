import React, { useState, useEffect } from 'react'

import Drawer from 'components/Drawer'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'

import SelectBrazilianStates from 'pages/CreditCard/Creation/common/SelectBrazilianStates'

import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'

import { dict } from 'components/IconExporter'
import { axiosInstance } from 'services/api'

import * as s from './styles'
import * as t from './types'

const EditingDeliveryData: React.FC<t.IEditingDeliveryData> = ({
  isOpen,
  handleClose,
  formData,
  setFormData,
  ...rest
}) => {
  const isMobile = useMedia('sm')
  const { addToast } = useToast()

  const zipCodeError = {
    icon: 'information' as keyof typeof dict,
    message: 'Insira um CEP válido.',
  }
  const addressError = {
    icon: 'information' as keyof typeof dict,
    message: 'O endereço informado não é válido.',
  }
  const addressNumberError = {
    icon: 'information' as keyof typeof dict,
    message: 'O número informado não é válido.',
  }
  const neighborhoodError = {
    icon: 'information' as keyof typeof dict,
    message: 'O bairro informado não é válido.',
  }
  const cityError = {
    icon: 'information' as keyof typeof dict,
    message: 'A cidade informada não é válida.',
  }

  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [zipCode, setZipCode] = useState('')
  const [address, setAddress] = useState('')
  const [addressNumber, setAddressNumber] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [selectedBrazilianState, setSelectedBrazilianState] = useState('')

  //Initial value
  useEffect(() => {
    if (formData?.cep) {
      setZipCode(formData.cep.replace(/(\d{5})(\d{1})/g, '$1-$2'))
    }
    if (formData?.logradouro) {
      setAddress(formData.logradouro)
    }
    if (formData?.numeroLogradouro) {
      setAddressNumber(String(formData.numeroLogradouro))
    }
    if (formData?.complemento) {
      setAdditionalInfo(formData.complemento)
    }
    if (formData?.bairro) {
      setNeighborhood(formData.bairro)
    }
    if (formData?.cidade) {
      setCity(formData.cidade)
    }
    if (formData?.uf) {
      setSelectedBrazilianState(formData.uf)
    }
  }, [formData])

  //set button disabled
  useEffect(() => {
    if (
      !zipCode.length ||
      zipCode.length < 9 ||
      !address.length ||
      !addressNumber.length ||
      !neighborhood.length ||
      !city.length ||
      selectedBrazilianState === ''
    ) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  }, [
    zipCode,
    address,
    addressNumber,
    neighborhood,
    city,
    selectedBrazilianState,
  ])

  const getAddress = async (cep: string) => {
    const [cepPrefix, cepSufix] = cep.split('-')

    setIsLoading(true)
    await axiosInstance
      .get('/cliente/endereco', {
        params: {
          cep: cepPrefix,
          cepSufixo: cepSufix,
        },
      })
      .then(response => {
        if (response.data.bairro) {
          setAddress(
            `${response.data.tipoLogradouro}. ${response.data.logradouro}`
          )
          setAddressNumber('')
          setAdditionalInfo('')
          setNeighborhood(response.data.bairro)
          setCity(response.data.cidade)
          setSelectedBrazilianState(response.data.uf)
        }
        return response.data
      })
      .catch(() =>
        addToast({
          title: `Houve um erro ao buscar o CEP`,
          description: `Por favor, edite o endereço manualmente.`,
          type: 'error',
        })
      )
      .finally(() => setIsLoading(false))
  }

  const getContent = () => (
    <s.Container>
      <s.CEPInput
        label="cep"
        name="cep"
        error={(!zipCode.length || zipCode.length < 9) && zipCodeError}
        value={zipCode.replace(/(\d{5})(\d{1})/g, '$1-$2')}
        placeholder="00000-000"
        suffix={isLoading && <Loading type="spinner" color="blue4" />}
        disabled={isLoading}
        onChange={(e: any) => {
          setZipCode(e.target.value)
          if (e.target.value.length >= 9) {
            getAddress(e.target.value)
          }
        }}
      />
      <s.Input
        label="endereço"
        error={!address.length && addressError}
        value={address}
        disabled={isLoading}
        onChange={e => setAddress(e.target.value)}
      />
      <s.Input
        label="número"
        error={!addressNumber.length && addressNumberError}
        value={addressNumber}
        onChange={e => setAddressNumber(e.target.value)}
      />
      <s.Input
        label="complemento"
        value={additionalInfo}
        disabled={isLoading}
        onChange={e => setAdditionalInfo(e.target.value)}
      />
      <s.Input
        label="bairro"
        error={!neighborhood.length && neighborhoodError}
        value={neighborhood}
        disabled={isLoading}
        onChange={e => setNeighborhood(e.target.value)}
      />
      <s.Input
        label="cidade"
        error={!city.length && cityError}
        value={city}
        disabled={isLoading}
        onChange={e => setCity(e.target.value)}
      />
      <SelectBrazilianStates
        selectedOption={selectedBrazilianState}
        setSelectedOption={setSelectedBrazilianState}
        disabled={isLoading}
        optionBoxDirection="top"
      />
    </s.Container>
  )

  const saveChanges = () => {
    handleClose()
    setFormData({
      ...formData,
      cep: zipCode,
      logradouro: address,
      numeroLogradouro: addressNumber,
      complemento: additionalInfo,
      bairro: neighborhood,
      cidade: city,
      uf: selectedBrazilianState,
    })
  }

  const footerButton = () => (
    <s.Button
      disabled={isButtonDisabled}
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname={'edição de endereço de entrega - cartão de crédito'}
      data-gtm-name="salvar alterações"
      onClick={() => saveChanges()}
    >
      SALVAR ALTERAÇÕES
    </s.Button>
  )

  if (isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        modalTitle="Alterar endereço de entrega"
        footer={footerButton()}
        {...rest}
      >
        {getContent()}
      </Modal>
    )
  } else {
    return (
      <Drawer
        size="sm"
        isOpen={isOpen}
        handleClose={handleClose}
        drawerTitle="Alterar endereço de entrega"
        footer={footerButton()}
        {...rest}
      >
        {getContent()}
      </Drawer>
    )
  }
}

export default EditingDeliveryData
