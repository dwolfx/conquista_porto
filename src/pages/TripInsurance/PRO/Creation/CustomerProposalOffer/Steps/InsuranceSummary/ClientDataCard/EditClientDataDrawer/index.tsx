import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

import Drawer from 'components/Drawer'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'
import VerticalList from 'components/VerticalList'
import Text from 'components/Text'
import WarningFlag from 'pages/TripInsurance/commons/WarningFlag'

import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'
import useMedia from 'hooks/useMedia'
import { formatCpf, handleGiwRedirect } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'

import * as s from './styles'
import * as t from './types'

const EditHirerData: React.FC<t.IEditHirerData> = ({
  isOpen,
  handleClose,
  ...rest
}) => {
  const isMobile = useMedia('sm')
  const { form, updateForm } = useFormFluxManagement<IForm>()

  const [isBrazilianResident, setIsBrazilianResident] = React.useState<boolean>(
    true
  )

  useFetchCustomerProfile()

  React.useEffect(() => {
    setIsBrazilianResident(form.passageiroPrincipal?.isResidePais ?? false)
  }, [form.passageiroPrincipal])

  const { customerProfile, isLoading } = useSelector((state: any) => ({
    customerProfile: state.customerProfile.data,
    isLoading: state.customerProfile.isLoading,
  }))

  const footerButton = () => (
    <s.SaveChangesButton
      disabled={isLoading}
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname="alterar dados do contratante - seguro viagem - pro"
      data-gtm-name="salvar alterações"
      onClick={() => {
        updateForm({
          ...form,
          passageiroPrincipal: {
            ...form.passageiroPrincipal,
            isResidePais: isBrazilianResident,
          },
        })
        handleClose()
      }}
    >
      SALVAR ALTERAÇÕES
    </s.SaveChangesButton>
  )

  const loadingContent = () => (
    <s.LoadingWrapper>
      <Loading
        textAlign="center"
        type="bar"
        legend="Aguarde, estamos buscando suas informações..."
      />
    </s.LoadingWrapper>
  )

  const renderContent = () => (
    <>
      <VerticalList
        elements={[
          <Text color="gray5" bold type="captionUppercase">
            NOME
          </Text>,
          <Text color="gray6" bold type="headline">
            {customerProfile?.customerName ?? ''}
          </Text>,
        ]}
      />
      <s.Divisor />
      <VerticalList
        elements={[
          <Text color="gray5" bold type="captionUppercase">
            CPF
          </Text>,
          <Text color="gray6" bold type="headline">
            {formatCpf(customerProfile?.cpfCnpj ?? '')}
          </Text>,
        ]}
      />
      <s.Divisor />
      <VerticalList
        elements={[
          <Text color="gray5" bold type="captionUppercase">
            DATA DE NASCIMENTO
          </Text>,
          <Text color="gray6" bold type="headline">
            {customerProfile?.customerBirthdate
              ? moment(customerProfile?.customerBirthdate).format('DD/MM/YYYY')
              : ''}
          </Text>,
        ]}
      />
      <s.Divisor />
      <VerticalList
        elements={[
          <Text color="gray5" bold type="captionUppercase">
            SEXO
          </Text>,
          <Text color="gray6" bold type="headline">
            {customerProfile?.customerGender
              ? customerProfile?.customerGender === 'M'
                ? 'Masculino'
                : 'Feminino'
              : ''}
          </Text>,
        ]}
      />
      <s.UpdateProfileButton
        outline
        data-gtm-type="click"
        data-gtm-clicktype="button"
        data-gtm-subname="alterar dados do contratante - seguro viagem"
        data-gtm-name="alterar no perfil"
        onClick={() => {
          handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
        }}
      >
        ALTERAR NO PERFIL
      </s.UpdateProfileButton>
      <s.Divisor />
      <s.RadioText>Você reside no Brasil?</s.RadioText>
      <s.RadioOptionsWrapper data-testid="radio-brazil-resident">
        <s.Radio
          id="sim"
          name="radio-brazil-resident"
          label="Sim"
          value={false}
          checked={isBrazilianResident}
          handleChange={() => setIsBrazilianResident(true)}
        />
        <s.Radio
          id="nao"
          name="radio-brazil-resident"
          label="Não"
          value
          checked={!isBrazilianResident}
          handleChange={() => setIsBrazilianResident(false)}
        />
      </s.RadioOptionsWrapper>
      {!isBrazilianResident && (
        <WarningFlag title="Este seguro só poderá ser contratado pelo segurado residente no Brasil." />
      )}
    </>
  )

  if (isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        handleClose={() => handleClose()}
        modalTitle="Alterar dados do contratante"
        footer={footerButton()}
        {...rest}
      >
        {isLoading ? loadingContent() : renderContent()}
      </Modal>
    )
  }
  return (
    <Drawer
      isOpen={isOpen}
      handleClose={() => handleClose()}
      drawerTitle="Alterar dados do contratante"
      size="sm"
      footer={footerButton()}
      {...rest}
    >
      {isLoading ? loadingContent() : renderContent()}
    </Drawer>
  )
}

export default EditHirerData
