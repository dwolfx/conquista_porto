import Drawer from 'components/Drawer'
import React, { useState } from 'react'
import { uuid } from 'uuidv4'
import moment from 'moment'

import { formatCpf, formatPhoneNumber } from 'helpers'
import useMedia from 'hooks/useMedia'

import * as s from './styles'

interface ICompanionEditDrawer {
  companion: any
  isDrawerOpen: boolean
  handleClose: (isDrawerOpen: boolean) => void
}

const CompanionEditDrawer: React.FC<ICompanionEditDrawer> = ({
  companion,
  isDrawerOpen,
  handleClose,
}) => {
  const isMobileOrTablet = useMedia('sm')
  const [isBrazilianResident, setIsBrazilianResident] = useState<boolean>(true)
  const [
    hasPoliticallyExposedPerson,
    setHasPoliticallyExposedPerson,
  ] = useState<boolean>(false)
  const [
    isSameContactForEmergencyData,
    setIsSameContactForEmergencyData,
  ] = useState<boolean>(false)

  const renderContent = () => (
    <>
      <s.Text
        type="subheading"
        bold
        textTransform="uppercase"
        textAlign="left"
        color="gray5"
      >
        Dados cadastrais
      </s.Text>
      <s.ColInput>
        <s.Input
          data-gtm-form="input"
          data-gtm-name="nome"
          name="name"
          maxLength={20}
          label="Nome Completo"
          onChange={() => {}}
          value={companion.name || ''}
        />
      </s.ColInput>
      <s.ColInput>
        <s.Input
          data-gtm-form="input"
          data-gtm-name="cpf"
          name="cpf"
          maxLength={20}
          label="CPF"
          onChange={() => {}}
          value={formatCpf(companion.cpf || '00000000000')}
        />
      </s.ColInput>
      <s.ColInput>
        <s.Input
          data-gtm-form="input"
          data-gtm-name="birthday"
          name="birthday"
          maxLength={20}
          label="Data de nascimento"
          onChange={() => {}}
          value={moment(companion.birthdayDate).format('DD/MM/YYYY')}
        />
      </s.ColInput>
      <s.ColInput>
        <s.Select
          options={[
            { id: 1, text: 'Masculino' },
            { id: 2, text: 'Feminino' },
          ]}
          selected={{ id: 1, name: 'Masculino' }}
          label="Sexo"
          optionBoxSize={200}
        />
      </s.ColInput>
      <s.Text bold>Você reside no Brasil?</s.Text>
      <s.RadioOptionsWrapper
        flexDirection="row"
        data-testid="radio-brazil-resident"
      >
        <s.Radio
          id={uuid()}
          name="radio-brazil-resident"
          label="Não"
          value={false}
          checked={!isBrazilianResident}
          handleChange={() => setIsBrazilianResident(false)}
        />
        <s.Radio
          id={uuid()}
          name="radio-brazil-resident"
          label="Sim"
          value={true}
          checked={isBrazilianResident}
          handleChange={() => setIsBrazilianResident(true)}
        />
      </s.RadioOptionsWrapper>
      {!isBrazilianResident && (
        <s.WarningFlag title="Este seguro só poderá ser contratado pelo segurado residente no Brasil." />
      )}
      <s.Divisor />
      <s.Text color="gray5" textTransform="uppercase" type="subheading" bold>
        Pessoa politicamente exposta
      </s.Text>
      <s.RadioOptionsWrapper
        flexDirection="row"
        data-testid="radio-politically-exposed"
      >
        <s.Radio
          id={uuid()}
          name="radio-politically-exposed"
          label="Sim"
          value={true}
          checked={hasPoliticallyExposedPerson}
          handleChange={() => {
            setHasPoliticallyExposedPerson(true)
          }}
        />
        <s.Radio
          id={uuid()}
          name="radio-politically-exposed"
          label="Não"
          value={false}
          checked={!hasPoliticallyExposedPerson}
          handleChange={() => {
            setHasPoliticallyExposedPerson(false)
          }}
        />
      </s.RadioOptionsWrapper>
      {hasPoliticallyExposedPerson && (
        <>
          <s.ColInput>
            <s.Select
              options={[
                { id: 1, text: 'Cônjuge' },
                { id: 2, text: 'Filho' },
              ]}
              selected={{ id: 1, name: 'Cônjuge' }}
              label="Quem é a pessoa políticamente exposta?"
              optionBoxSize={200}
            />
          </s.ColInput>
          <s.ColInput>
            <s.Input
              data-gtm-form="input"
              data-gtm-name="pessoa-politicamente-exposta-nome"
              name="politicallyExposedPersonName"
              maxLength={20}
              label="Nome completo"
              onChange={() => {}}
              value={companion.politicallyExposedPersonName || ''}
            />
          </s.ColInput>
          <s.ColInput>
            <s.Input
              data-gtm-form="input"
              data-gtm-name="pessoa-politicamente-exposta-cpf"
              name="politicallyExposedPersonCPF"
              maxLength={20}
              label="CPF"
              onChange={() => {}}
              value="000.000.000-00"
            />
          </s.ColInput>
        </>
      )}
      <s.Divisor />
      <s.Text color="gray5" textTransform="uppercase" type="subheading" bold>
        Dados para emergência
      </s.Text>
      <s.RadioOptionsWrapper
        flexDirection="column"
        data-testid="radio-emergency-data"
      >
        <s.Radio
          id={uuid()}
          name="radio-emergency-data"
          label="Considerar o mesmo contato
          do passageiro principal"
          value={true}
          checked={isSameContactForEmergencyData}
          handleChange={() => setIsSameContactForEmergencyData(true)}
        />
        <s.Radio
          id={uuid()}
          name="radio-emergency-data"
          label="Inserir contato para emergência"
          value={false}
          checked={!isSameContactForEmergencyData}
          handleChange={() => setIsSameContactForEmergencyData(false)}
        />
      </s.RadioOptionsWrapper>
      {!isSameContactForEmergencyData && (
        <s.Content>
          <s.ColInput>
            <s.Input
              data-gtm-form="input"
              data-gtm-name="contato-de-emergencia-nome"
              name="EmergencyContactName"
              maxLength={20}
              label="Pessoa a ser contatada"
              onChange={() => {}}
              value={companion.name || ''}
            />
          </s.ColInput>
          <s.ColInput>
            <s.Input
              data-gtm-form="input"
              data-gtm-name="contato-de-emergencia-telefone"
              name="EmergencyContactPhone"
              maxLength={20}
              label="Telefone"
              onChange={() => {}}
              value={formatPhoneNumber(11, 111111111)}
            />
          </s.ColInput>
        </s.Content>
      )}
    </>
  )

  const footerDrawer = () => (
    <s.ButtonSubmit
      data-gtm-subname={`drawer editar acompanhante`}
      data-gtm-name="confirmar"
      disabled={false}
    >
      Confirmar
    </s.ButtonSubmit>
  )

  if (isMobileOrTablet) {
    return (
      <s.Modal
        modalTitle={companion.name}
        isOpen={isDrawerOpen}
        handleClose={() => handleClose(false)}
        footer={footerDrawer()}
      >
        {renderContent()}
      </s.Modal>
    )
  }

  return (
    <Drawer
      isOpen={isDrawerOpen}
      drawerTitle={companion.name}
      handleClose={() => handleClose(false)}
      size="sm"
      footer={footerDrawer()}
    >
      {renderContent()}
    </Drawer>
  )
}

export default CompanionEditDrawer
