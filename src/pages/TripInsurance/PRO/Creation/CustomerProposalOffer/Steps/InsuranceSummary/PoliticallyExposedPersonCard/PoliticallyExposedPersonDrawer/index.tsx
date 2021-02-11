import React from 'react'
import { useSelector } from 'react-redux'

import Drawer from 'components/Drawer'
import Loading from 'components/Loading'
import Modal from 'components/Modal/ModalNew'
import { dict } from 'components/IconExporter'

import useFetchCustomerProfile from 'hooks/CustomerProfile/useFetchCustomerProfile'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import useMedia from 'hooks/useMedia'

import { cpf, formatCpf } from 'helpers'

import { IForm } from 'pages/TripInsurance/PRO/types'

import { ICustomerProfileState } from '../../types'

import * as s from './styles'
import * as t from './types'
import * as u from './utils'

const PoliticallyExposedPersonDrawer: React.FC<t.IPoliticallyExposedPersonDrawer> = ({
  isOpen,
  handleClose,
  ...rest
}) => {
  const isMobile = useMedia('sm')
  const { form, updateForm } = useFormFluxManagement<IForm>()

  const [
    hasPoliticallyExposedPerson,
    setHasPoliticallyExposedPerson,
  ] = React.useState<boolean>(false)
  const [
    selectedPoliticalyExposedKinship,
    setSelectedPoliticalyExposedKinship,
  ] = React.useState<{ name: string; value: number }>({ name: '', value: 0 })
  const [
    politicalyExposedPersonName,
    setPoliticalyExposedPersonName,
  ] = React.useState<string>('')
  const [
    politicalyExposedPersonCPF,
    setPoliticalyExposedPersonCPF,
  ] = React.useState<string>('')
  const [isCPFValid, setIsCPFValid] = React.useState<boolean>(true)

  useFetchCustomerProfile()

  const { customerProfileData, customerProfileIsLoading } = useSelector(
    (state: { customerProfile: ICustomerProfileState }) => ({
      customerProfileData: state.customerProfile.data,
      customerProfileIsLoading: state.customerProfile.isLoading,
    })
  )

  // Has politically exposed person
  React.useEffect(() => {
    if (form.pessoaExposta?.grauRelacionamento !== 2) {
      setHasPoliticallyExposedPerson(true)
    }

    if (form.pessoaExposta?.grauRelacionamento === 2) {
      setHasPoliticallyExposedPerson(false)
    }
  }, [form.pessoaExposta])

  // Politicaly exposed kinship
  React.useEffect(() => {
    if (form.pessoaExposta?.grauRelacionamento !== 2) {
      setSelectedPoliticalyExposedKinship(
        form.pessoaExposta?.grauParentesco
          ? u.PPEList[
              form.pessoaExposta?.grauParentesco === 7
                ? 0
                : form.pessoaExposta?.grauParentesco
            ]
          : { name: '', value: 0 }
      )
    }

    if (form.pessoaExposta?.grauRelacionamento === 2) {
      setSelectedPoliticalyExposedKinship({ name: '', value: 0 })
    }
  }, [form.pessoaExposta])

  // Politicaly exposed person name
  React.useEffect(() => {
    if (form.pessoaExposta?.grauRelacionamento !== 2) {
      setPoliticalyExposedPersonName(form.pessoaExposta?.nome ?? '')
    }
    if (form.pessoaExposta?.grauRelacionamento === 2) {
      setPoliticalyExposedPersonName('')
    }
  }, [form.pessoaExposta])

  // Politicaly exposed person CPF
  React.useEffect(() => {
    if (
      form.pessoaExposta?.grauRelacionamento !== 2 &&
      form.pessoaExposta?.numeroCpf &&
      form.pessoaExposta?.digitoCpf
    ) {
      setPoliticalyExposedPersonCPF(
        `${form.pessoaExposta?.numeroCpf}${form.pessoaExposta?.digitoCpf}`
      )
    }

    if (form.pessoaExposta?.grauRelacionamento === 2) {
      setPoliticalyExposedPersonCPF('')
    }
  }, [form.pessoaExposta])

  // Set name and CPF case kinship is equal ({ name: 'Eu', value: 7, })
  React.useEffect(() => {
    if (selectedPoliticalyExposedKinship.value === 7 && customerProfileData) {
      setPoliticalyExposedPersonName(customerProfileData.customerName)
      setPoliticalyExposedPersonCPF(customerProfileData.cpfCnpj)
    }
  }, [selectedPoliticalyExposedKinship, customerProfileData])

  const loadingContent = () => (
    <s.LoadingWrapper>
      <Loading
        textAlign="center"
        type="bar"
        legend="Aguarde, estamos buscando suas informações..."
      />
    </s.LoadingWrapper>
  )

  const footerButton = () => (
    <s.SaveChangesButton
      disabled={
        hasPoliticallyExposedPerson
          ? politicalyExposedPersonName.length === 0 ||
            politicalyExposedPersonCPF.length === 0 ||
            !isCPFValid ||
            selectedPoliticalyExposedKinship.value === 0
          : false || customerProfileIsLoading
      }
      data-gtm-type="click"
      data-gtm-clicktype="button"
      data-gtm-subname="alterar pessoa politicamente exposta - seguro viagem - pro"
      data-gtm-name="salvar alterações"
      onClick={() => {
        if (!hasPoliticallyExposedPerson) {
          updateForm({
            ...form,
            pessoaExposta: {
              ...form.pessoaExposta,
              grauRelacionamento: 2,
              nome: '',
              numeroCpf: '',
              digitoCpf: '',
              grauParentesco: 0,
            },
          })
        } else {
          updateForm({
            ...form,
            pessoaExposta: {
              ...form.pessoaExposta,
              nome: politicalyExposedPersonName,
              numeroCpf: politicalyExposedPersonCPF.slice(0, 9),
              digitoCpf: politicalyExposedPersonCPF.slice(9, 11),
              grauRelacionamento:
                selectedPoliticalyExposedKinship.value === 7 ? 1 : 3,
              grauParentesco: selectedPoliticalyExposedKinship.value,
            },
          })
        }
        handleClose()
      }}
    >
      SALVAR ALTERAÇÕES
    </s.SaveChangesButton>
  )

  const renderContent = () => (
    <>
      <s.Headline>
        Você é ou possui parentesco com uma pessoa politicamente exposta?
      </s.Headline>
      <s.ExplanationText>
        Pessoa Exposta Politicamente é aquela que desempenha ou desempenhou nos
        últimos cinco anos anteriores, cargos, empregos ou funções públicas
        relevantes como chefes de estado e de governo, políticos de alto nível,
        altos servidores dos poderes públicos, magistrados ou militares de alto
        nível, dirigentes de empresas públicas ou dirigentes de partidos
        políticos.
      </s.ExplanationText>
      <s.RadioOptionsWrapper data-testid="radio-exposed-person">
        <s.Radio
          options={u.radioOptions}
          checkedItem={hasPoliticallyExposedPerson ? '0' : '1'}
          onChange={(event: React.FormEvent<HTMLInputElement>) =>
            setHasPoliticallyExposedPerson(event.currentTarget.value === '0')
          }
        />
      </s.RadioOptionsWrapper>
      {hasPoliticallyExposedPerson ? (
        <>
          <s.Select
            options={u.getPoliticalyExposedKinshipOptions(
              setSelectedPoliticalyExposedKinship
            )}
            selected={selectedPoliticalyExposedKinship}
            label="Quem é a pessoa políticamente exposta?"
            optionBoxSize={300}
          />
          {selectedPoliticalyExposedKinship.value !== 7 &&
          selectedPoliticalyExposedKinship.value !== 0 ? (
            <>
              <s.Input
                data-gtm-form="input"
                data-gtm-name="pessoa-politicamente-exposta-nome"
                name="politicallyExposedPersonName"
                label="Nome completo"
                placeholder="Digite aqui"
                value={politicalyExposedPersonName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPoliticalyExposedPersonName(event.target.value)
                }}
              />
              <s.Input
                data-gtm-form="input"
                data-gtm-name="pessoa-politicamente-exposta-cpf"
                name="politicallyExposedPersonCPF"
                maxLength={14}
                label="CPF"
                placeholder="000.000.000-00"
                value={formatCpf(politicalyExposedPersonCPF)}
                error={
                  !isCPFValid && {
                    icon: 'alertrounded' as keyof typeof dict,
                    message: 'CPF inválido. Por favor, verifique.',
                  }
                }
                onBlur={() => {
                  setIsCPFValid(cpf.isValid(politicalyExposedPersonCPF))
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPoliticalyExposedPersonCPF(
                    event.target.value.replace(/\./g, '').replace('-', '')
                  )
                  u.checkOnChangeCpfValidity(event.target.value, setIsCPFValid)
                }}
              />
            </>
          ) : null}
        </>
      ) : null}
    </>
  )

  if (isMobile) {
    return (
      <Modal
        isOpen={isOpen}
        handleClose={() => handleClose()}
        modalTitle="Alterar pessoa politicamente exposta"
        footer={footerButton()}
        {...rest}
      >
        {customerProfileIsLoading ? loadingContent() : renderContent()}
      </Modal>
    )
  }

  return (
    <Drawer
      isOpen={isOpen}
      handleClose={() => handleClose()}
      drawerTitle="Alterar pessoa politicamente exposta"
      size="sm"
      footer={footerButton()}
      {...rest}
    >
      {customerProfileIsLoading ? loadingContent() : renderContent()}
    </Drawer>
  )
}

export default PoliticallyExposedPersonDrawer
