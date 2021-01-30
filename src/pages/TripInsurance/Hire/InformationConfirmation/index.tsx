import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import React from 'react'
import { uuid } from 'uuidv4'
import useMedia from 'hooks/useMedia'

import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'

import Divisor from 'components/Divisor'

import { formatCpf, handleGiwRedirect } from 'helpers'
import { IForm, Steps } from 'pages/TripInsurance/Creation/types'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'
import Radio from 'components/Inputs/Radio'
import InputMask from 'react-input-mask'
import * as s from './styles'

import AddressForm from './AddressForm'
import {
  errorObject,
  validtionGeneric,
} from 'pages/CreditCard/Creation/CreditCardStep/validators'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import { cpf } from 'cpf-cnpj-validator'
import { ITripInsuranceQuotation } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { useSelector } from 'react-redux'

const radioOptions = [
  {
    value: '0',
    name: 'Não',
  },
  {
    value: '1',
    name: 'Sim',
  },
]

const radioPpeOptions = [
  {
    value: '2',
    name: 'Não',
  },
  {
    value: '1',
    name: 'Sim',
  },
]

interface IFormInformationConfirmation {
  isContactPhone: boolean
  isContactName: boolean
  isPpe: boolean
  isPpeOptions: boolean
  isFullNamePpe: boolean
  isDocumentPpe: boolean
}

const InformationConfirmation: StepComponent = () => {
  const isSmUp = useMedia('smUp')
  const isLgUp = useMedia('lgUp')
  const { form, updateForm } = useFormFluxManagement<IForm>()
  const { instantiate, reset } = useStackFluxManagement<StepComponentProps>()

  const { tripInsuranceQuotations } = useSelector(
    (state: { tripInsuranceQuotation: ITripInsuranceQuotation }) => ({
      tripInsuranceQuotations: state.tripInsuranceQuotation.data,
      isLoading: state.tripInsuranceQuotation.isLoading,
      hasError: state.tripInsuranceQuotation.hasError,
      idSimulation: state.tripInsuranceQuotation.data?.idSimulacao,
    })
  )

  const [activeSelectGender, setActiveSelectGender] = React.useState<boolean>(
    true
  )
  const [documentPpe, setDocumentPpe] = React.useState<string>()
  const [isNotification, setIsNotification] = React.useState<boolean>(false)
  const [validForm, setValidForm] = React.useState<
    IFormInformationConfirmation
  >({
    isContactName: false,
    isContactPhone: false,
    isPpe: false,
    isPpeOptions: false,
    isFullNamePpe: false,
    isDocumentPpe: false,
  })

  const checkForm = (key: string) => {
    setValidForm((check: IFormInformationConfirmation) => ({
      ...check,
      [key]: true,
    }))
  }

  const [genders] = React.useState([
    {
      id: 1,
      text: 'Masculino',
      onClick: () => {
        setGenderSelect({ id: 1, name: 'Masculino' })
        setActiveSelectGender(false)
        updateForm({
          ...form,
          passageiroPrincipal: {
            ...form.passageiroPrincipal,
            sexo: 'M',
          },
        })
      },
    },
    {
      id: 2,
      text: 'Feminino',
      onClick: () => {
        setGenderSelect({ id: 2, name: 'Feminino' })
        setActiveSelectGender(false)
        updateForm({
          ...form,
          passageiroPrincipal: {
            ...form.passageiroPrincipal,
            sexo: 'F',
          },
        })
      },
    },
  ])

  const [genderSelect, setGenderSelect] = React.useState({
    id: 0,
    name: 'Selecione',
  })

  const setCloseRelationship = (grauParentesco: number) => {
    updateForm({
      ...form,
      passageiroPrincipal: {
        ...form.passageiroPrincipal,
        pessoaExposta: {
          ...form.passageiroPrincipal?.pessoaExposta,
          grauRelacionamento: 3,
          grauParentesco,
        },
      },
    })
  }

  const [ppeOptions] = React.useState([
    {
      id: 7,
      text: 'Eu',
      onClick: () => setPpeOptionsSelect({ id: 7, name: 'Eu' }),
    },
    {
      id: 5,
      text: 'Pai ou mãe',
      onClick: () => setPpeOptionsSelect({ id: 5, name: 'Pai ou mãe' }),
    },
    {
      id: 2,
      text: 'Cônjuge',
      onClick: () => setPpeOptionsSelect({ id: 2, name: 'Cônjuge' }),
    },
    {
      id: 1,
      text: 'Companheiro(a)',
      onClick: () => setPpeOptionsSelect({ id: 1, name: 'Companheiro(a)' }),
    },
    {
      id: 4,
      text: 'Filho(a)',
      onClick: () => setPpeOptionsSelect({ id: 4, name: 'Filho(a)' }),
    },
    {
      id: 3,
      text: 'Enteado(a)',
      onClick: () => setPpeOptionsSelect({ id: 3, name: 'Enteado(a)' }),
    },
    {
      id: 6,
      text: 'Outros',
      onClick: () => setPpeOptionsSelect({ id: 6, name: 'Outros' }),
    },
  ])

  const [ppeOptionsSelect, setPpeOptionsSelect] = React.useState({
    id: 0,
    name: 'Selecione',
  })

  React.useEffect(() => {
    updateForm({
      ...form,
      passageiroPrincipal: {
        ...form.passageiroPrincipal,
        isResidePais: true,
        pessoaExposta: {
          ...form.passageiroPrincipal?.pessoaExposta,
          grauRelacionamento: 2,
        },
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = () => {
    instantiate(Steps.companionStep)
  }

  const handlerDocumentPpe = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, '')
    setDocumentPpe(value)

    if (value.length === 11) {
      updateForm({
        ...form,
        passageiroPrincipal: {
          ...form.passageiroPrincipal,
          pessoaExposta: {
            ...form.passageiroPrincipal?.pessoaExposta,
            numeroCpf: value.slice(0, 9),
            digitoCpf: value.slice(-2),
          },
        },
      })
    }
  }

  const isPpeValid = (): boolean => {
    if (form.passageiroPrincipal?.pessoaExposta?.grauRelacionamento) {
      if (form.passageiroPrincipal?.pessoaExposta?.grauRelacionamento === 1) {
        return ppeOptionsSelect.id === 7
      }

      if (form.passageiroPrincipal?.pessoaExposta?.grauRelacionamento === 3) {
        return (
          !!form.passageiroPrincipal?.pessoaExposta?.nome &&
          !!form.passageiroPrincipal?.pessoaExposta?.numeroCpf &&
          form.passageiroPrincipal?.pessoaExposta?.numeroCpf.length === 9 &&
          !!form.passageiroPrincipal?.pessoaExposta?.digitoCpf &&
          form.passageiroPrincipal?.pessoaExposta?.digitoCpf.length === 2 &&
          cpf.isValid(
            `${form.passageiroPrincipal.pessoaExposta.numeroCpf}${form.passageiroPrincipal.pessoaExposta.digitoCpf}`
          )
        )
      }

      return true
    }

    return false
  }

  const isDisabledButton: boolean =
    !!form.passageiroPrincipal?.sexo &&
    !!form.passageiroPrincipal?.isResidePais &&
    !!form.passageiroPrincipal?.endereco?.tipo &&
    !!form.passageiroPrincipal?.endereco?.bairro &&
    !!form.passageiroPrincipal?.endereco?.cidade &&
    !!form.passageiroPrincipal?.endereco?.uf &&
    !!form.passageiroPrincipal?.endereco?.logradouro &&
    !!form.passageiroPrincipal?.endereco?.numero &&
    !!form.passageiroPrincipal?.endereco?.numeroCep &&
    !!form.isAceiteTermos &&
    !!form.isCienteMoto &&
    !!form.passageiroPrincipal?.contato?.nome &&
    !!form.passageiroPrincipal?.contato?.celularDDD &&
    !!form.passageiroPrincipal?.contato?.celularNumero &&
    form.passageiroPrincipal?.contato?.celularDDD.length === 2 &&
    [8, 9].includes(form.passageiroPrincipal?.contato?.celularNumero.length) &&
    isPpeValid()

  React.useEffect(() => {
    if (ppeOptionsSelect.id === 7) {
      updateForm({
        ...form,
        passageiroPrincipal: {
          ...form.passageiroPrincipal,
          pessoaExposta: {
            ...form.passageiroPrincipal?.pessoaExposta,
            grauRelacionamento: 1,
          },
        },
      })
    }

    if (![0, 7].includes(ppeOptionsSelect.id)) {
      setCloseRelationship(ppeOptionsSelect.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ppeOptionsSelect])

  const handlerClick = () => {
    handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
    reset()
  }

  const validationDocumentPpe = (): errorObject | boolean => {
    if (
      form.passageiroPrincipal?.pessoaExposta?.numeroCpf &&
      form.passageiroPrincipal?.pessoaExposta?.numeroCpf.length === 9 &&
      form.passageiroPrincipal?.pessoaExposta?.digitoCpf &&
      form.passageiroPrincipal?.pessoaExposta?.digitoCpf.length === 2
    ) {
      if (
        !cpf.isValid(
          `${form.passageiroPrincipal.pessoaExposta.numeroCpf}${form.passageiroPrincipal.pessoaExposta.digitoCpf}`
        )
      ) {
        return {
          icon: 'information',
          message: 'CPF Inválido',
        }
      }
    }

    return validtionGeneric(documentPpe, validForm.isDocumentPpe)
  }

  const validationPhone = (): errorObject | boolean => {
    if (
      form.passageiroPrincipal?.contato?.celularDDD &&
      form.passageiroPrincipal?.contato?.celularNumero
    ) {
      if (
        form.passageiroPrincipal?.contato?.celularDDD.length !== 2 ||
        ![8, 9].includes(
          form.passageiroPrincipal?.contato?.celularNumero.length
        )
      ) {
        return {
          icon: 'information',
          message: 'Telefone Inválido',
        }
      }
    }

    return validtionGeneric(
      `${form.passageiroPrincipal?.contato?.celularDDD}${form.passageiroPrincipal?.contato?.celularNumero}`,
      validForm.isContactPhone
    )
  }

  return (
    <>
      <StepBar title="Contratação" actualStep={1} totalNumberOfSteps={4} />
      <s.ContentContainer>
        <s.Col lg={3}>
          <s.TitleWrapper>
            <s.TitleText type="heading4" bold>
              Confirme seus dados
            </s.TitleText>
            {isLgUp ? <Divisor /> : null}
            <s.TitleText color="gray6" type={isSmUp ? 'headline' : 'body'}>
              Precisamos confirmar algumas informações para continuar.
            </s.TitleText>
          </s.TitleWrapper>
        </s.Col>
        <s.Col lg={8} md={10}>
          <s.Card overflow="visible">
            <s.CardTitleWrapper>
              <s.CardTitleText
                type="subheading"
                bold
                color="gray5"
                textTransform="uppercase"
              >
                dados cadastrais
              </s.CardTitleText>
              <ButtonLink onClick={handlerClick}>
                <Text
                  bold
                  type="button"
                  color="blue4"
                  textTransform="uppercase"
                >
                  alterar no perfil
                </Text>
              </ButtonLink>
            </s.CardTitleWrapper>
            <s.DataDisplay
              label="Nome"
              value={form.passageiroPrincipal?.nome}
            />
            <Divisor />
            <s.DataDisplay
              label="CPF"
              value={formatCpf(
                `${form.passageiroPrincipal?.numeroCpf}${form.passageiroPrincipal?.digitoCpf}`
              )}
            />
            <Divisor />
            <s.DataDisplay
              label="Data de nascimento"
              value={form.passageiroPrincipal?.dataNascimento}
            />
            <Divisor />
            {form.passageiroPrincipal?.sexo && activeSelectGender ? (
              <s.DataDisplay
                label="Sexo"
                value={
                  form.passageiroPrincipal?.sexo === 'M'
                    ? 'Masculino'
                    : 'Feminino'
                }
              />
            ) : (
              <s.DelimiterWrapper>
                <s.Select
                  label="sexo"
                  options={genders}
                  selected={genderSelect}
                />
              </s.DelimiterWrapper>
            )}
            <Divisor />
            <s.RadioContainer>
              <Text type="headline" bold>
                Você reside no Brasil?
              </Text>
              <s.RadioOptionsWrapper data-testid="radio-brazilian-resident">
                <s.Radio
                  options={radioOptions}
                  checkedItem={
                    form.passageiroPrincipal?.isResidePais ? '1' : '0'
                  }
                  onChange={e => {
                    updateForm({
                      ...form,
                      passageiroPrincipal: {
                        ...form.passageiroPrincipal,
                        isResidePais: !!+e.currentTarget.value,
                      },
                    })
                  }}
                />
              </s.RadioOptionsWrapper>
              {form.passageiroPrincipal?.isResidePais === false && (
                <s.WarningFlag title="Este seguro só poderá ser contratado pelo segurado residente no Brasil." />
              )}
            </s.RadioContainer>
          </s.Card>
          <s.Card>
            <s.CardTitleWrapper>
              <s.CardTitleText
                type="subheading"
                bold
                color="gray5"
                textTransform="uppercase"
              >
                dados para contato
              </s.CardTitleText>
              <ButtonLink onClick={handlerClick}>
                <Text
                  bold
                  type="button"
                  color="blue4"
                  textTransform="uppercase"
                >
                  alterar no perfil
                </Text>
              </ButtonLink>
            </s.CardTitleWrapper>
            <s.DataDisplay label="E-mail" value="bruno.mizrahi@sciensa.com" />
            <Divisor />
            <s.DataDisplay label="Celular" value="(11) 9 9725-7249" />
          </s.Card>
          <s.Card overflow="visible">
            <s.CardTitleText
              type="subheading"
              bold
              color="gray5"
              textTransform="uppercase"
            >
              pessoa politicamente exposta (PPE)
            </s.CardTitleText>
            <s.RadioContainerPPE>
              <s.TextWithBottomMargin type="headline" bold>
                Você é ou possui parentesco com uma pessoa politicamente
                exposta?
              </s.TextWithBottomMargin>
              <Text bold color="gray5">
                Pessoa Exposta Politicamente é aquela que desempenha ou
                desempenhou nos últimos cinco anos, cargos, empregos ou funções
                públicas relevantes como chefes de estado e de governo,
                políticos, altos servidores dos poderes públicos, magistrados ou
                militares de alto nível, dirigentes de empresas públicas ou
                dirigentes de partidos políticos.
              </Text>
              <s.RadioOptionsWrapper data-testid="radio-ppe">
                <Radio
                  options={radioPpeOptions}
                  checkedItem={
                    form.passageiroPrincipal?.pessoaExposta
                      ?.grauRelacionamento === 2
                      ? '2'
                      : '1'
                  }
                  onChange={e => {
                    updateForm({
                      ...form,
                      passageiroPrincipal: {
                        ...form.passageiroPrincipal,
                        pessoaExposta: {
                          ...form.passageiroPrincipal?.pessoaExposta,
                          grauRelacionamento: +e.currentTarget.value,
                        },
                      },
                    })
                  }}
                />
              </s.RadioOptionsWrapper>
            </s.RadioContainerPPE>
            {form.passageiroPrincipal?.pessoaExposta?.grauRelacionamento &&
              [1, 3].includes(
                form.passageiroPrincipal?.pessoaExposta?.grauRelacionamento
              ) && (
                <s.DelimiterWrapper>
                  <s.Select
                    label={
                      isSmUp
                        ? 'quem é a pessoa políticamente exposta?'
                        : 'quem é a PPE?'
                    }
                    options={ppeOptions}
                    selected={ppeOptionsSelect}
                    optionBoxDirection="bottom"
                  />
                  {form.passageiroPrincipal?.pessoaExposta
                    ?.grauRelacionamento &&
                    form.passageiroPrincipal?.pessoaExposta
                      ?.grauRelacionamento === 3 && (
                      <>
                        <s.PPENameInput
                          label="nome completo"
                          value={
                            form.passageiroPrincipal?.pessoaExposta?.nome || ''
                          }
                          error={validtionGeneric(
                            form.passageiroPrincipal?.pessoaExposta?.nome,
                            validForm.isFullNamePpe
                          )}
                          onBlur={() => checkForm('isFullNamePpe')}
                          placeholder="Digite aqui"
                          onChange={e => {
                            updateForm({
                              ...form,
                              passageiroPrincipal: {
                                ...form.passageiroPrincipal,
                                pessoaExposta: {
                                  ...form.passageiroPrincipal?.pessoaExposta,
                                  nome: e.currentTarget.value,
                                },
                              },
                            })
                          }}
                        />
                        <InputMask
                          mask="999.999.999-99"
                          value={documentPpe}
                          maskPlaceholder={null}
                          onChange={handlerDocumentPpe}
                          onBlur={() => checkForm('isDocumentPpe')}
                        >
                          <s.PPEDocumentInput
                            label="cpf"
                            placeholder="000.000.000-00"
                            error={validationDocumentPpe()}
                          />
                        </InputMask>
                      </>
                    )}
                </s.DelimiterWrapper>
              )}
          </s.Card>
          <s.Card overflow="visible">
            <s.CardTitleText
              type="subheading"
              bold
              color="gray5"
              textTransform="uppercase"
            >
              Endereço
            </s.CardTitleText>
            {isSmUp ? (
              <>
                <s.AddressText color="gray5">
                  Por favor, inclua somente CEPs de endereços no Brasil.
                </s.AddressText>
                <s.AddressText color="gray5">
                  Endereços no exterior não são válidos.
                </s.AddressText>
              </>
            ) : (
              <s.AddressText color="gray5" bold>
                Por favor, inclua somente CEPs de endereços no Brasil. Endereços
                no exterior não são válidos.
              </s.AddressText>
            )}
            <s.TextInputContainer>
              <AddressForm />
            </s.TextInputContainer>
          </s.Card>
          <s.Card>
            <s.CardTitleText
              type="subheading"
              bold
              color="gray5"
              textTransform="uppercase"
            >
              contato em caso de acidentes
            </s.CardTitleText>
            <s.EmergencyContactWrapper>
              <s.EmergencyContactTextInput
                label="nome"
                value={form.passageiroPrincipal?.contato?.nome || ''}
                placeholder="Digite aqui"
                error={validtionGeneric(
                  form.passageiroPrincipal?.contato?.nome,
                  validForm.isContactName
                )}
                onBlur={() => checkForm('isContactName')}
                onChange={e =>
                  updateForm({
                    ...form,
                    passageiroPrincipal: {
                      ...form.passageiroPrincipal,
                      contato: {
                        ...form.passageiroPrincipal?.contato,
                        nome: e.currentTarget.value,
                      },
                    },
                  })
                }
              />
              <InputMask
                value={
                  `${form.passageiroPrincipal?.contato?.celularDDD}${form.passageiroPrincipal?.contato?.celularNumero}` ||
                  ''
                }
                maskPlaceholder={null}
                mask={
                  form.passageiroPrincipal?.contato?.celularNumero &&
                  form.passageiroPrincipal?.contato?.celularNumero.length === 9
                    ? '(99) 9 9999-9999'
                    : '(99) 9999-99999'
                }
                onBlur={() => checkForm('isContactPhone')}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  const value = e.currentTarget.value.replace(/\D/g, '')
                  updateForm({
                    ...form,
                    passageiroPrincipal: {
                      ...form.passageiroPrincipal,
                      contato: {
                        ...form.passageiroPrincipal?.contato,
                        celularDDD: value.slice(0, 2),
                        celularNumero: value.slice(2),
                      },
                    },
                  })
                }}
              >
                <s.EmergencyContactTextInput
                  label="telefone"
                  placeholder="(00) 0 0000-0000"
                  error={validationPhone()}
                />
              </InputMask>
            </s.EmergencyContactWrapper>
          </s.Card>
          <s.Card>
            <s.CardTitleText
              type="subheading"
              bold
              color="gray5"
              textTransform="uppercase"
            >
              termos de contratação
            </s.CardTitleText>
            <s.WrapperHiringTerms>
              <s.TextWithBottomMargin bold color="gray5" type="caption">
                É fundamental que você saiba o que está coberto por este seguro
                e o que não está antes de contratar.
              </s.TextWithBottomMargin>
              <Text bold color="gray5" type="caption">
                Para isso, por favor, leia as Condições Gerais para continuar.
              </Text>
            </s.WrapperHiringTerms>
            <s.WrapperHiringTerms>
              <s.IconWrapper>
                <s.Icon name="pdf" color="blue4" />
                <ButtonLink
                  noIcon
                  href={tripInsuranceQuotations?.urlCondicoesGerais || ''}
                  target="_blank"
                >
                  <Text
                    bold
                    type="button"
                    color="blue4"
                    textTransform="uppercase"
                  >
                    condições gerais
                  </Text>
                </ButtonLink>
              </s.IconWrapper>
              <s.IconWrapper>
                <s.Icon name="pdf" color="blue4" />
                <ButtonLink
                  noIcon
                  href="https://www.portoseguro.com.br/politica-de-privacidade"
                  target="_blank"
                >
                  <Text
                    bold
                    type="button"
                    color="blue4"
                    textTransform="uppercase"
                  >
                    política de privacidade
                  </Text>
                </ButtonLink>
              </s.IconWrapper>
            </s.WrapperHiringTerms>
            <s.TextInputContainer>
              <s.WrapperHiringTerms>
                <s.Checkbox
                  id={uuid()}
                  checked={form.isAceiteTermos ?? false}
                  onChange={() =>
                    updateForm({
                      ...form,
                      isAceiteTermos: !form.isAceiteTermos,
                    })
                  }
                  label="Declaro que li e aceito as Condições Gerais deste seguro."
                />
                <s.Checkbox
                  id={uuid()}
                  checked={form.isCienteMoto ?? false}
                  onChange={() =>
                    updateForm({
                      ...form,
                      isCienteMoto: !form.isCienteMoto,
                    })
                  }
                  label="Estou ciente de que não
                há cobertura para eventos
                decorrentes de viagens
                de motocicleta na América
                Latina."
                />
                <s.Checkbox
                  id={uuid()}
                  checked={isNotification}
                  onChange={() => setIsNotification(!isNotification)}
                  label="Aceito receber informações
                e novidades da Porto Seguro
                em meu e-mail."
                />
              </s.WrapperHiringTerms>
            </s.TextInputContainer>
          </s.Card>
        </s.Col>
      </s.ContentContainer>
      <s.FooterContainer>
        <s.NextButton
          color="secondary"
          disabled={!isDisabledButton}
          onClick={onSubmit}
        >
          próximo
        </s.NextButton>
      </s.FooterContainer>
    </>
  )
}

export default InformationConfirmation
