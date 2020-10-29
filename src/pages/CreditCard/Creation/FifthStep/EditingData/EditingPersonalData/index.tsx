import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { uuid } from 'uuidv4'
import moment from 'moment'

import Drawer from 'components/Drawer'
import Modal from 'components/Modal/ModalNew'

import CivilState from '../../../ThirdStep/Selects/CivilState'
import Loading from 'components/Loading'
import Ocupation from '../../../ThirdStep/Selects/Ocupation'
import Gender from '../../../ThirdStep/Selects/Sex'

import { dict } from 'components/IconExporter'
import { formatCpf, handleGiwRedirect } from 'helpers'

import useMedia from 'hooks/useMedia'
import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'

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

  const [city, setCity] = useState('São Paulo')
  const [mothersName, setMothersName] = useState('')
  const [selectedCivilState, setSelectedCivilState] = useState<t.IOption>({
    id: 1,
    name: 'Solteiro',
  })
  const [selectedGender, setSelectedGender] = useState<t.IOption>({
    id: 1,
    name: 'Masculino',
  })
  const [selectedProfession, setSelectedProfession] = useState<t.IOption>({
    id: 1,
    name: 'Projetista',
  })

  useFetchCustomerProfile()

  const { customerProfile, creditCardOccupation } = useSelector<any, any>(state => ({
    customerProfile: state.customerProfile,
    creditCardOccupation: state.creditCardOccupation,
  }))

  //Customer data
  useEffect(() => {
    if (customerProfile.isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    if (customerProfile.data) {
      setCustomerData([
        {
          label: 'E-MAIL',
          value: customerProfile.data.customerEmail,
        },
        {
          label: 'CPF',
          value: formatCpf(customerProfile.data.cpfCnpj),
        },
        {
          label: 'DATA DE NASCIMENTO',
          value: moment(customerProfile.data.customerBirthdate).format(
            'DD/MM/YYYY'
          ),
        },
        {
          label: 'CELULAR',
          value: `${customerProfile.data.customerAreaCode}${customerProfile.data.customerPhoneNumber}`.replace(
            /(\d{2})(\d{1})(\d{4})(\d{4})/,
            '($1) $2 $3-$4'
          ),
        },
      ])
    }
  }, [customerProfile.data, customerProfile.isLoading])

  //Initial value
  useEffect(() => {
    if (formData?.personalData?.city) {
      setCity(formData.personalData.city)
    }
    if (formData?.personalData?.mothersName) {
      setMothersName(formData.personalData.mothersName)
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
          />
          <Gender
            selectedOption={selectedGender}
            setSelectedOption={setSelectedGender}
          />
          <Ocupation
            selectedOption={selectedProfession}
            setSelectedOption={setSelectedProfession}
            creditCardOccupation={creditCardOccupation}
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
      personalData: {
        ...formData.personalData,
        city,
        civilStatus: selectedCivilState,
        gender: selectedGender,
        profession: selectedProfession,
        mothersName,
      },
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
