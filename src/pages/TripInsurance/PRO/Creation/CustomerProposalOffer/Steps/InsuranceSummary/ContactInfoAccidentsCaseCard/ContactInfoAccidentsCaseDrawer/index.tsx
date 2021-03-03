import React from 'react'

import Drawer from 'components/Drawer'
import Modal from 'components/Modal/ModalNew'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useMedia from 'hooks/useMedia'

import { formatPhoneNumber } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'

import * as s from './styles'
import * as t from './types'

const ContactInfoAccidentsCaseDrawer: React.FC<t.IContactInfoAccidentsCaseDrawer> = ({
  isOpen,
  handleClose,
  ...rest
}) => {
  const isMobile = useMedia('sm')
  const { form, updateForm } = useFormFluxManagement<IForm>()

  const [name, setName] = React.useState<string>('')
  const [phoneNumber, setPhoneNumber] = React.useState<string>('')
  const [isPhoneNumberValid, setIsPhoneNumberValid] = React.useState<boolean>(
    true
  )

  // Contact name
  React.useEffect(() => {
    if (form.passageiroPrincipal?.contato?.nome) {
      setName(form.passageiroPrincipal?.contato?.nome ?? '')
    }
  }, [form.passageiroPrincipal])

  // Contact phone number
  React.useEffect(() => {
    if (
      form.passageiroPrincipal?.contato?.celularDDD &&
      form.passageiroPrincipal?.contato?.celularNumero
    ) {
      setPhoneNumber(
        `${form.passageiroPrincipal?.contato?.celularDDD}${form.passageiroPrincipal?.contato?.celularNumero}` ??
          ''
      )
    }
  }, [form.passageiroPrincipal])

  const footerButton = () => (
    <s.SaveChangesButton
      disabled={!name || phoneNumber.length < 10 || !isPhoneNumberValid}
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname="alterar contato em caso de acidente - seguro viagem - pro"
      data-gtm-name="salvar alterações"
      onClick={() => {
        updateForm({
          ...form,
          passageiroPrincipal: {
            ...form.passageiroPrincipal,
            contato: {
              ...form.passageiroPrincipal?.contato,
              nome: name,
              celularDDD: phoneNumber.slice(0, 2),
              celularNumero: phoneNumber.slice(2, 11),
            },
          },
        })
        handleClose()
      }}
    >
      SALVAR ALTERAÇÕES
    </s.SaveChangesButton>
  )

  const renderContent = () => (
    <>
      <s.Input
        data-gtm-form="input"
        data-gtm-name="contato-caso-acidente-nome"
        label="Nome"
        placeholder="Digite aqui"
        value={name}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value)
        }}
      />
      <s.Input
        data-gtm-form="input"
        data-gtm-name="contato-caso-acidente-telefone"
        maxLength={16}
        label="telefone"
        placeholder="Digite somente números"
        value={formatPhoneNumber(phoneNumber)}
        error={
          !isPhoneNumberValid
            ? {
                icon: 'information',
                message: 'Telefone Inválido.',
              }
            : false
        }
        onBlur={() => {
          setIsPhoneNumberValid(phoneNumber.length > 9)
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPhoneNumber(event.target.value.replace(/\D/g, ''))
          setIsPhoneNumberValid(true)
        }}
      />
    </>
  )

  if (isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        handleClose={() => handleClose()}
        modalTitle="Alterar contato em caso de acidente"
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
      drawerTitle="Alterar contato em caso de acidente"
      size="sm"
      footer={footerButton()}
      {...rest}
    >
      {renderContent()}
    </Drawer>
  )
}

export default ContactInfoAccidentsCaseDrawer
