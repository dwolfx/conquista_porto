import Drawer from 'components/Drawer'
import React, { useState, useEffect, useCallback } from 'react'
import 'styled-components/macro'
import { uuid } from 'uuidv4'
import moment from 'moment'

import { dict } from 'components/IconExporter'
import useMedia from 'hooks/useMedia'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import { IForm, ICompanion } from 'pages/TripInsurance/Creation/types'
import { formatCpf, formatPhoneNumber, cpf } from 'helpers'

import * as s from './styles'
interface IProps {
  companions: ICompanion[]
  isDrawerOpen: boolean
  selectedCompanion: number
  companionAge: number
  handleClose: (isDrawerOpen: boolean) => void
}
const CompanionEditDrawer: React.FC<IProps> = ({
  companions,
  isDrawerOpen,
  selectedCompanion,
  companionAge,
  handleClose,
}) => {
  const isMobileOrTablet = useMedia('sm')
  const { updateForm, form } = useFormFluxManagement<IForm>()

  // Form input states
  const [isValid, setIsValid] = useState(false)
  const [fullName, setFullName] = useState({ value: '', touched: false })
  const [documentNumber, setDocumentNumber] = useState({
    value: '',
    touched: false,
  })
  const [birthday, setBirthday] = useState({ value: '', touched: false })
  const [emergencyContactName, setEmergencyContactName] = useState({
    value: '',
    touched: false,
  })
  const [emergencyContactPhone, setEmergencyContactPhone] = useState({
    value: '',
    touched: false,
  })
  const [
    politicalyExposedPersonName,
    setPoliticalyExposedPersonName,
  ] = useState({ value: '', touched: false })
  const [
    politicalyExposedPersonDocument,
    setPoliticalyExposedDocument,
  ] = useState({ value: '', touched: false })
  const [
    selectedPoliticalyExposedKinship,
    setSelectedPoliticalyExposedKinship,
  ] = useState<{ name: string; value: any }>({ name: '', value: '' })
  const [selectedGender, setSelectedGender] = useState<{
    name: string
    value: any
  }>({ name: '', value: '' })
  const [isBrazilianResident, setIsBrazilianResident] = useState<boolean>(true)
  const [
    hasPoliticallyExposedPerson,
    setHasPoliticallyExposedPerson,
  ] = useState<boolean>(false)
  const [
    isSameContactForEmergencyData,
    setIsSameContactForEmergencyData,
  ] = useState<boolean>(false)

  const validatePoliticalyExposedPersonData = useCallback(() => {
    if (hasPoliticallyExposedPerson) {
      return (
        politicalyExposedPersonName.value !== '' &&
        cpf.isValid(cpf.strip(politicalyExposedPersonDocument.value))
      )
    }
    return false
  }, [
    hasPoliticallyExposedPerson,
    politicalyExposedPersonName,
    politicalyExposedPersonDocument,
  ])

  const validateEmergencyContactData = useCallback(() => {
    if (!isSameContactForEmergencyData) {
      return (
        emergencyContactName.value !== '' &&
        emergencyContactPhone.value !== '' &&
        emergencyContactPhone.value.length > 10
      )
    }
    return false
  }, [
    isSameContactForEmergencyData,
    emergencyContactName,
    emergencyContactPhone,
  ])

  const setDataHooks = useCallback((type: string, data: ICompanion = {}) => {
    setFullName(
      type === 'update'
        ? {
            touched: false,
            value: data.nome || '',
          }
        : { touched: false, value: '' }
    )
    setDocumentNumber(
      type === 'update'
        ? {
            touched: false,
            value: `${data.numeroCpf}${data.digitoCpf}`,
          }
        : { touched: false, value: '' }
    )
    setBirthday(
      type === 'update'
        ? {
            touched: false,
            value: `${data.dataNascimento}`,
          }
        : { touched: false, value: '' }
    )
    setIsBrazilianResident(
      type === 'update' ? data.isResidePais || false : true
    )
    setSelectedGender(
      type === 'update'
        ? data.sexo === 'M'
          ? {
              name: 'Masculino',
              value: 'M',
            }
          : { name: 'Feminino', value: 'F' }
        : { name: '', value: '' }
    )
    setHasPoliticallyExposedPerson(
      type === 'update'
        ? Object.keys(data.pessoaExposta || {}).length
          ? true
          : false
        : false
    )
    setSelectedPoliticalyExposedKinship(
      type === 'update'
        ? {
            name: getPoliticalExposedKinship(
              data.pessoaExposta ? data.pessoaExposta?.grauParentesco || 0 : 0
            ),
            value: data.pessoaExposta
              ? data.pessoaExposta?.grauParentesco || 0
              : 0,
          }
        : { name: '', value: '' }
    )
    setPoliticalyExposedPersonName(
      type === 'update'
        ? {
            touched: Object.keys(data.pessoaExposta || {}).length
              ? true
              : false,
            value: Object.keys(data.pessoaExposta || {}).length
              ? `${data.pessoaExposta?.nome}`
              : '',
          }
        : { touched: false, value: '' }
    )
    setPoliticalyExposedDocument(
      type === 'update'
        ? {
            touched: false,
            value: Object.keys(data.pessoaExposta || {}).length
              ? `${data.pessoaExposta?.numeroCpf}${data.pessoaExposta?.digitoCpf}`
              : '',
          }
        : { touched: false, value: '' }
    )
    setIsSameContactForEmergencyData(
      type === 'update' ? (data.contato?.nome ? false : true) : false
    )

    setEmergencyContactName(
      type === 'update'
        ? {
            touched: false,
            value: data.contato?.nome ? data.contato.nome : '',
          }
        : { touched: false, value: '' }
    )
    setEmergencyContactPhone(
      type === 'update'
        ? {
            touched: false,
            value: `${data.contato?.celularDDD ? data.contato.celularDDD : ''}${
              data.contato?.celularNumero ? data.contato.celularNumero : ''
            }`,
          }
        : { touched: false, value: '' }
    )
  }, [])

  // input validation
  useEffect(() => {
    if (
      isBrazilianResident &&
      isSameContactForEmergencyData &&
      !hasPoliticallyExposedPerson &&
      fullName.value !== '' &&
      cpf.isValid(documentNumber.value) &&
      birthday.value !== '' &&
      selectedGender.value !== ''
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)

      if (
        fullName.value === '' ||
        !cpf.isValid(documentNumber.value) ||
        birthday.value === ''
      ) {
        setIsValid(false)
      } else {
        if (hasPoliticallyExposedPerson && !isSameContactForEmergencyData) {
          setIsValid(
            validatePoliticalyExposedPersonData() &&
              validateEmergencyContactData()
          )
        } else if (!isSameContactForEmergencyData) {
          setIsValid(validateEmergencyContactData())
        } else if (hasPoliticallyExposedPerson) {
          setIsValid(validatePoliticalyExposedPersonData())
        } else {
          setIsValid(false)
        }
      }

      if (!isBrazilianResident) {
        setIsValid(false)
      }
    }
  }, [
    fullName,
    documentNumber,
    birthday,
    selectedGender,
    isBrazilianResident,
    isSameContactForEmergencyData,
    hasPoliticallyExposedPerson,
    validateEmergencyContactData,
    validatePoliticalyExposedPersonData,
  ])

  useEffect(() => {
    if (isDrawerOpen) {
      const selectedCompanionData = companions?.filter(
        person => person.id === selectedCompanion
      )
      if (selectedCompanionData && selectedCompanionData[0].status) {
        setDataHooks('update', selectedCompanionData[0])
      }
    }
  }, [isDrawerOpen, companions, setDataHooks, selectedCompanion])

  const validateCPF = (cpfValue: string) => {
    const strippedCpfValue = cpf.strip(cpfValue)
    if (!strippedCpfValue) {
      return {
        icon: 'alertrounded' as keyof typeof dict,
        message: 'Insira seu CPF.',
      }
    } else if (!cpf.isValid(strippedCpfValue)) {
      return {
        icon: 'alertrounded' as keyof typeof dict,
        message: 'CPF inválido. Por favor, verifique o número.',
      }
    }
    return false
  }

  const validateContactTelephone = (telephone: string) => {
    if (telephone.length > 0 && telephone.length < 10) {
      return {
        icon: 'alertrounded' as keyof typeof dict,
        message: 'Telefone inválido. Por favor, verifique o número',
      }
    }
    return false
  }

  const validateDate = (date: string) => {
    let icon = 'alertrounded' as keyof typeof dict
    const dateYear = date.slice(6)
    const interval = moment()
      .subtract(companionAge, 'year')
      .format('YYYY')
    const check = moment(dateYear).isAfter(interval)
    const checkCurrentYear = moment(dateYear).isAfter(moment().format('YYYY'))
    const valid = moment(date, 'DD/MM/YYYY').isValid()

    if (date.length === 0) return false

    if (valid && !checkCurrentYear && date.length === 10) {
      if (companionAge > 70 && check && moment().diff(dateYear, 'year') < 90) {
        return {
          icon,
          message:
            'Você definiu esse acompanhante como maior de 70 anos na etapa de simulação.',
        }
      } else if (
        companionAge > 70 &&
        !check &&
        moment().diff(dateYear, 'year') > 90
      ) {
        return {
          icon,
          message:
            'Você definiu esse acompanhante com até 90 anos na etapa de simulação.',
        }
      } else if (companionAge === 70 && !check) {
        return {
          icon,
          message:
            'Você definiu esse acompanhante como menor de 70 anos na etapa de simulação.',
        }
      }
    } else {
      return {
        icon,
        message: 'Data de nascimento inválida.',
      }
    }
  }

  const getPoliticalExposedKinship = (value: number) => {
    const kinshipList = [
      { value: 1, name: 'Companheiro(a)' },
      { value: 2, name: 'Cônjuge' },
      { value: 3, name: 'Enteado(a)' },
      { value: 4, name: 'Filho(a)' },
      { value: 5, name: 'Pai ou Mãe' },
      { value: 6, name: 'Outros' },
    ]
    const positionKinship = kinshipList.filter(
      kinship => kinship.value === value
    )
    return positionKinship[0] ? positionKinship[0].name : ''
  }

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
          label="Nome Completo"
          placeholder="Digite aqui"
          maxLength={40}
          value={fullName.value}
          onChange={(e: any) => {
            setFullName({
              touched: true,
              value: e.target.value,
            })
          }}
          error={
            !fullName.value &&
            fullName.touched && {
              icon: 'alertrounded',
              message: 'Insira seu nome completo.',
            }
          }
        />
      </s.ColInput>
      <s.ColInput>
        <s.Input
          data-gtm-form="input"
          data-gtm-name="cpf"
          name="cpf"
          maxLength={14}
          placeholder="000.000.000-00"
          label="CPF"
          value={formatCpf(documentNumber.value)}
          error={documentNumber.touched && validateCPF(documentNumber.value)}
          onChange={(e: any) => {
            setDocumentNumber({
              touched: true,
              value: e.target.value,
            })
          }}
        />
      </s.ColInput>
      <s.ColInput>
        <s.DateInput
          newInput
          data-gtm-form="input"
          data-gtm-name="birthday"
          name="birthday"
          label="Data de nascimento"
          placeholder="01/01/2000"
          value={birthday.value}
          error={
            birthday.touched && birthday.value === ''
              ? {
                  icon: 'alertrounded',
                  message: 'Insira a data de nascimento.',
                }
              : validateDate(birthday.value)
          }
          onChange={(e: any) => {
            setBirthday({
              touched: true,
              value: e.target.value,
            })
          }}
        />
      </s.ColInput>
      <s.ColInput>
        <s.Select
          selected={selectedGender}
          label="Sexo"
          optionBoxSize={200}
          options={[
            {
              id: 1,
              text: 'Masculino',
              onClick: () =>
                setSelectedGender({ name: 'Masculino', value: 'M' }),
            },
            {
              id: 2,
              text: 'Feminino',
              onClick: () =>
                setSelectedGender({ name: 'Feminino', value: 'F' }),
            },
          ]}
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
            setPoliticalyExposedPersonName({ value: '', touched: false })
            setPoliticalyExposedDocument({ value: '', touched: false })
            setSelectedPoliticalyExposedKinship({ name: '', value: '' })
          }}
        />
      </s.RadioOptionsWrapper>
      {hasPoliticallyExposedPerson && (
        <s.ContentWrapper>
          <s.ColInput>
            <s.Select
              options={[
                {
                  id: 1,
                  text: 'Companheiro(a)',
                  onClick: () =>
                    setSelectedPoliticalyExposedKinship({
                      name: 'Companheiro(a)',
                      value: 1,
                    }),
                },
                {
                  id: 2,
                  text: 'Cônjuge',
                  onClick: () =>
                    setSelectedPoliticalyExposedKinship({
                      name: 'Cônjuge',
                      value: 2,
                    }),
                },
                {
                  id: 3,
                  text: 'Enteado(a)',
                  onClick: () =>
                    setSelectedPoliticalyExposedKinship({
                      name: 'Enteado(a)',
                      value: 3,
                    }),
                },
                {
                  id: 4,
                  text: 'Filho(a)',
                  onClick: () =>
                    setSelectedPoliticalyExposedKinship({
                      name: 'Filho(a)',
                      value: 4,
                    }),
                },
                {
                  id: 5,
                  text: 'Pai ou mãe',
                  onClick: () =>
                    setSelectedPoliticalyExposedKinship({
                      name: 'Pai ou mãe',
                      value: 5,
                    }),
                },
                {
                  id: 6,
                  text: 'Outros',
                  onClick: () =>
                    setSelectedPoliticalyExposedKinship({
                      name: 'Outros',
                      value: 6,
                    }),
                },
              ]}
              selected={selectedPoliticalyExposedKinship}
              label="Quem é a pessoa políticamente exposta?"
              optionBoxSize={350}
            />
          </s.ColInput>
          <s.ColInput>
            <s.Input
              data-gtm-form="input"
              data-gtm-name="pessoa-politicamente-exposta-nome"
              name="politicallyExposedPersonName"
              maxLength={20}
              label="Nome completo"
              placeholder="Digite aqui"
              value={politicalyExposedPersonName.value}
              error={
                politicalyExposedPersonName.touched &&
                politicalyExposedPersonName.value === '' && {
                  icon: 'alertrounded',
                  message: 'Insira o nome do acompanhante.',
                }
              }
              onChange={(e: any) => {
                setPoliticalyExposedPersonName({
                  touched: true,
                  value: e.target.value,
                })
              }}
            />
          </s.ColInput>
          <s.ColInput>
            <s.Input
              data-gtm-form="input"
              data-gtm-name="pessoa-politicamente-exposta-cpf"
              name="politicallyExposedPersonCPF"
              maxLength={20}
              label="CPF"
              placeholder="000.000.000-00"
              value={formatCpf(politicalyExposedPersonDocument.value)}
              error={
                politicalyExposedPersonDocument.touched &&
                validateCPF(politicalyExposedPersonDocument.value)
              }
              onChange={(e: any) => {
                setPoliticalyExposedDocument({
                  touched: true,
                  value: e.target.value,
                })
              }}
            />
          </s.ColInput>
        </s.ContentWrapper>
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
          handleChange={() => {
            setIsSameContactForEmergencyData(true)
            setEmergencyContactName({ touched: false, value: '' })
            setEmergencyContactPhone({ touched: false, value: '' })
          }}
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
              maxLength={40}
              label="Pessoa a ser contatada"
              placeholder="Digite aqui"
              error={
                emergencyContactName.touched &&
                emergencyContactName.value === '' && {
                  icon: 'alertrounded',
                  message: 'Insira o nome do contato de emergência.',
                }
              }
              value={emergencyContactName.value}
              onChange={(e: any) => {
                setEmergencyContactName({
                  touched: true,
                  value: e.target.value,
                })
              }}
            />
          </s.ColInput>
          <s.ColInput>
            <s.Input
              data-gtm-form="input"
              data-gtm-name="contato-de-emergencia-telefone"
              name="EmergencyContactPhone"
              maxLength={16}
              placeholder="(00) 0 0000-0000"
              label="Telefone"
              value={formatPhoneNumber(emergencyContactPhone.value)}
              error={
                emergencyContactPhone.touched &&
                emergencyContactPhone.value === ''
                  ? {
                      icon: 'alertrounded',
                      message:
                        'Insira o nº de telefone do contato de emergência.',
                    }
                  : validateContactTelephone(emergencyContactPhone.value)
              }
              onChange={(e: any) => {
                setEmergencyContactPhone({
                  touched: true,
                  value: e.target.value.replace(/[\D]/g, ''),
                })
              }}
            />
          </s.ColInput>
        </s.Content>
      )}
    </>
  )

  const footerDrawer = () => (
    <s.ButtonWrapper>
      <s.ButtonSubmit
        data-gtm-subname={`drawer editar acompanhante`}
        data-gtm-name="limpar dados"
        outline
        onClick={() => {
          setDataHooks('clear')
        }}
      >
        Limpar Dados
      </s.ButtonSubmit>
      <s.ButtonSubmit
        data-gtm-subname={`drawer editar acompanhante`}
        data-gtm-name="confirmar"
        onClick={() => {
          let updatedCompanion: ICompanion = {
            id: selectedCompanion,
            status: true,
            nome: fullName.value,
            dataNascimento: birthday.value,
            sexo: selectedGender.value,
            numeroCpfResponsavel: form.passageiroPrincipal?.numeroCpf,
            digitoCpfResponsavel: form.passageiroPrincipal?.digitoCpf,
            numeroCpf: documentNumber.value.slice(0, 9),
            digitoCpf: documentNumber.value.slice(9),
            isResidePais: isBrazilianResident,
            codigoPaisResidente: '',
            contato: {
              nome: isSameContactForEmergencyData
                ? form.passageiroPrincipal?.nome
                : emergencyContactName.value,
              celularDDD: isSameContactForEmergencyData
                ? form.passageiroPrincipal?.celularDDD
                : emergencyContactPhone.value.slice(0, 2),
              celularNumero: isSameContactForEmergencyData
                ? form.passageiroPrincipal?.celularNumero
                : emergencyContactPhone.value.slice(2),
            },
          }

          if (hasPoliticallyExposedPerson) {
            updatedCompanion = {
              ...updatedCompanion,
              pessoaExposta: {
                grauParentesco: selectedPoliticalyExposedKinship.value,
                grauRelacionamento: form?.pessoaExposta?.grauRelacionamento,
                nome: politicalyExposedPersonName.value,
                numeroCpf: politicalyExposedPersonDocument.value.slice(0, 9),
                digitoCpf: politicalyExposedPersonDocument.value.slice(9),
              },
            }
          }
          const oldCompanions = [...companions]
          const oldCompanionIndex = oldCompanions.findIndex(
            oldCompanion => oldCompanion.id === selectedCompanion
          )
          oldCompanions.splice(oldCompanionIndex, 1, updatedCompanion)
          const updatedCompanions = [...oldCompanions]
          updateForm({
            acompanhantes: [...updatedCompanions],
          })
          setDataHooks('clear')
          handleClose(false)
        }}
        disabled={!isValid}
      >
        Confirmar
      </s.ButtonSubmit>
    </s.ButtonWrapper>
  )

  if (isMobileOrTablet) {
    return (
      <s.Modal
        modalTitle={fullName.value || 'Acompanhante'}
        isOpen={isDrawerOpen}
        handleClose={() => {
          setDataHooks('clear')
          handleClose(false)
        }}
        footer={footerDrawer()}
      >
        {renderContent()}
      </s.Modal>
    )
  }

  return (
    <Drawer
      isOpen={isDrawerOpen}
      footerHeight="149px"
      drawerTitle={fullName.value || 'Acompanhante'}
      handleClose={() => {
        setDataHooks('clear')
        handleClose(false)
      }}
      size="sm"
      footer={footerDrawer()}
    >
      {renderContent()}
    </Drawer>
  )
}

export default CompanionEditDrawer
