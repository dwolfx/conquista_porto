import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { uuid } from 'uuidv4'
import moment from 'moment'

import Drawer from 'components/Drawer'
import Modal from 'components/Modal/ModalNew'

import Loading from 'components/Loading'
import CivilState from 'pages/CreditCard/Creation/common/CivilState'
import { ECivilStateLabel } from 'pages/CreditCard/Creation/common/CivilState/types'
import Ocupation from 'pages/CreditCard/Creation/common/Ocupation'
import Gender from 'pages/CreditCard/Creation/common/Sex'
import { ESexLabel } from 'pages/CreditCard/Creation/common/Sex/types'

import { dict } from 'components/IconExporter'
import { formatCpf, handleGiwRedirect } from 'helpers'

import useMedia from 'hooks/useMedia'

import * as s from './styles'
import * as t from './types'

const EditingPersonalData: React.FC<t.IEditingPersonalData> = ({
  isOpen,
  handleClose,
  formData,
  setFormData,
  ...rest
}) => {
  const isMobile = useMedia('sm')

  const cityError = {
    icon: 'information' as keyof typeof dict,
    message: 'A cidade informada não é válida.',
  }
  const mothersNameError = {
    icon: 'information' as keyof typeof dict,
    message: 'O nome informado não é válido.',
  }

  const [isLoading, setIsLoading] = useState(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  const [customerData, setCustomerData] = useState<t.ICustomerData[] | null>(
    null
  )

  const [city, setCity] = useState('')
  const [mothersName, setMothersName] = useState('')
  const [selectedCivilState, setSelectedCivilState] = useState<t.IOption>({
    id: 0,
    name: '',
  })
  const [selectedGender, setSelectedGender] = useState<t.IOption>({
    id: 0,
    name: '',
  })
  const [selectedProfession, setSelectedProfession] = useState<t.IOption>({
    id: 0,
    name: '',
  })

  const {
    creditCardClient,
    isClientDataLoading,
    creditCardOccupation,
  } = useSelector<any, any>(state => ({
    creditCardClient: state.creditCard.clientData,
    isClientDataLoading: state.creditCard.isClientDataLoading,
    creditCardOccupation: state.creditCardOccupation,
  }))

  //Customer data
  useEffect(() => {
    if (isClientDataLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    if (creditCardClient) {
      setCustomerData([
        {
          label: 'E-MAIL',
          value: creditCardClient.emailCliente,
        },
        {
          label: 'CPF',
          value: formatCpf(creditCardClient.cpfCnpj),
        },
        {
          label: 'DATA DE NASCIMENTO',
          value: moment(creditCardClient.dataNascimento).format('DD/MM/YYYY'),
        },
        {
          label:
            String(creditCardClient.numeroTelefone).length === 9
              ? 'CELULAR'
              : 'TELEFONE',
          value:
            String(creditCardClient.numeroTelefone).length === 9
              ? `${creditCardClient.dddNumeroTelefone}${creditCardClient.numeroTelefone}`.replace(
                  /(\d{2})(\d{1})(\d{4})(\d{4})/,
                  '($1) $2 $3-$4'
                )
              : `${creditCardClient.dddNumeroTelefone}${creditCardClient.numeroTelefone}`.replace(
                  /(\d{2})(\d{4})(\d{4})/,
                  '($1) $2-$3'
                ),
        },
      ])
    }
  }, [creditCardClient, isClientDataLoading])

  //Initial value
  useEffect(() => {
    if (formData.nomeMae) {
      setMothersName(formData.nomeMae)
    }
    if (formData.codigoEstadoCivil) {
      setSelectedCivilState({
        id: formData.codigoEstadoCivil,
        name: ECivilStateLabel[formData.codigoEstadoCivil],
      })
    }
    if (formData.sexo) {
      setSelectedGender({
        id: formData.sexo,
        name: ESexLabel[formData.sexo as 'M' | 'F'],
      })
    }
    if (formData.cidade) {
      setCity(formData.cidade)
    }
  }, [formData])

  //set button disabled
  useEffect(() => {
    if (isLoading || !city.length || !mothersName.length) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  }, [isLoading, city, mothersName])

  const getContent = () => {
    if (isLoading) {
      return (
        <s.LoadingWrapper>
          <Loading type="bar" />
        </s.LoadingWrapper>
      )
    }

    return (
      <>
        <s.CustomerData>
          {customerData
            ? customerData.map(item => (
                <React.Fragment key={uuid()}>
                  <s.VerticalList
                    elements={[
                      <s.Label>{item.label}</s.Label>,
                      <s.Value>{item.value}</s.Value>,
                    ]}
                  />
                </React.Fragment>
              ))
            : null}
          <s.UpdateProfileButton
            outline
            data-gtm-type="click"
            data-gtm-clicktype="UpdateProfileButton"
            data-gtm-subname={'edição de dados pessoais - cartão de crédito'}
            data-gtm-name="alterar no perfil"
            onClick={() => {
              handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
            }}
          >
            ALTERAR NO PERFIL
          </s.UpdateProfileButton>
        </s.CustomerData>
        <s.Divisor />
        <s.Container>
          <s.Input
            label="cidade"
            error={!city.length && cityError}
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <CivilState
            selectedOption={selectedCivilState}
            setSelectedOption={setSelectedCivilState}
            preSelectedCivilState={+formData.codigoEstadoCivil}
          />
          <Gender
            selectedOption={selectedGender}
            setSelectedOption={setSelectedGender}
            preSelectedSex={formData.sexo}
          />
          <Ocupation
            selectedOption={selectedProfession}
            setSelectedOption={setSelectedProfession}
            creditCardOccupation={creditCardOccupation}
            preSelectedOccupation={+formData.codigoProfissao}
          />
          <s.Input
            label="nome da mãe"
            error={!mothersName.length && mothersNameError}
            value={mothersName}
            onChange={e => setMothersName(e.target.value)}
          />
        </s.Container>
      </>
    )
  }

  const saveChanges = () => {
    handleClose()
    setFormData({
      ...formData,
      cidade: city,
      codigoEstadoCivil: `${selectedCivilState.id}`,
      sexo: selectedGender.name === 'Masculino' ? 'M' : 'F',
      codigoProfissao: `${selectedProfession.id}`,
      nomeMae: mothersName,
    })
  }

  const footerButton = () => (
    <s.Button
      disabled={isButtonDisabled}
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname={'edição de dados pessoais - cartão de crédito'}
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
        modalTitle="Alterar dados pessoais"
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
        drawerTitle="Alterar dados pessoais"
        footer={footerButton()}
        {...rest}
      >
        {getContent()}
      </Drawer>
    )
  }
}

export default EditingPersonalData
