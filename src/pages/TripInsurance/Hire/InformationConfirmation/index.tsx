import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Row } from 'styled-bootstrap-grid'
import { uuid } from 'uuidv4'
import { cpf } from 'cpf-cnpj-validator'
import InputMask from 'react-input-mask'

import StepBar from 'components/StepBar'
import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import Divisor from 'components/Divisor'
import Radio from 'components/Inputs/Radio'
import AddressForm from './AddressForm'

import useMedia from 'hooks/useMedia'
import { useToast } from 'hooks/toast'
import useStackFluxManagement from 'hooks/FluxManagement/useStackFluxManagement'
import useFormFluxManagement from 'hooks/FluxManagement/useFormFluxManagement'

import { GetTripInsuranceCreditCardRequest } from 'store/modules/TripInsurance/CreditCard/action'

import { formatCpf, handleGiwRedirect } from 'helpers'
import {
  errorObject,
  validationInputError,
} from 'pages/CreditCard/Creation/CreditCardStep/validators'

import { TOptions, TSelected } from 'components/Inputs/Select/types'
import { StepComponent, StepComponentProps } from 'hooks/FluxManagement/types'
import {
  IForm,
  IPassengerAddress,
  IPoliticallyExposedPerson,
  Steps,
} from 'pages/TripInsurance/Creation/types'
import { ITripInsuranceQuotation } from 'store/modules/TripInsurance/InsuranceQuotation/types'
import { ITripInsuranceCreditCard } from 'store/modules/TripInsurance/CreditCard/types'

import {
  radioOptions,
  radioPpeOptions,
  selectPpeOptions,
  genderOptions,
} from './form'

import * as s from './styles'

interface IFormInformationConfirmation {
  isContactPhone: boolean
  isContactName: boolean
  isPpe: boolean
  isPpeOptions: boolean
  isFullNamePpe: boolean
  isDocumentPpe: boolean
}

const InformationConfirmation: StepComponent = () => {
  /**
   * HOOKS
   */

  const isSmUp = useMedia('smUp')
  const isLgUp = useMedia('lgUp')
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const { form, updateForm } = useFormFluxManagement<IForm>()
  const { instantiate, reset } = useStackFluxManagement<StepComponentProps>()

  /**
   * USESELECT
   */

  const {
    tripInsuranceQuotations,
    creditCardData,
    isCreditCardLoading,
  } = useSelector(
    (state: {
      tripInsuranceQuotation: ITripInsuranceQuotation
      tripInsuranceCreditCard: ITripInsuranceCreditCard
    }) => ({
      tripInsuranceQuotations: state.tripInsuranceQuotation.data,
      creditCardData: state.tripInsuranceCreditCard.data,
      isCreditCardLoading: state.tripInsuranceCreditCard.isLoading,
    })
  )

  /**
   * USESTATE
   */

  /**
   * USESTATE - VALIDATION
   */

  const [activeSelectGender, setActiveSelectGender] = React.useState<boolean>(
    true
  )
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

  const [genderSelect, setGenderSelect] = React.useState<TSelected>({
    id: 0,
    name: 'Selecione',
  })

  const [genders] = React.useState<TOptions[]>(
    genderOptions(setGenderSelect, setActiveSelectGender)
  )

  const [ppeOptionsSelect, setPpeOptionsSelect] = React.useState<TSelected>({
    id: 0,
    name: 'Selecione',
  })

  const [ppeOptions] = React.useState<TOptions[]>(
    selectPpeOptions(setPpeOptionsSelect)
  )

  /**
   * USESTATE - FORM
   */

  const [documentPpe, setDocumentPpe] = React.useState<string>()
  const [documentNumberPpe, setDocumentNumberPpe] = React.useState<string>()
  const [documentDigitPpe, setDocumentDigitPpe] = React.useState<string>()
  const [namePpe, setNamePpe] = React.useState<string>()
  const [isReside, setIsReside] = React.useState<boolean>(
    form.passageiroPrincipal?.isResidePais ?? true
  )
  const [degreeRelationship, setDegreeRelationship] = React.useState<number>(
    form?.pessoaExposta?.grauRelacionamento || 2
  )

  const [address, setAddress] = React.useState<IPassengerAddress>({
    tipo: 'Rua',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    complemento: '',
    numero: '',
    numeroCep: '',
    complementoCep: '',
  })

  /**
   * USEEFFECT
   */

  React.useEffect(() => {
    if (ppeOptionsSelect && ppeOptionsSelect.id) {
      setDegreeRelationship(ppeOptionsSelect.id === 7 ? 1 : 3)
    }
  }, [ppeOptionsSelect])

  React.useEffect(() => {
    if (degreeRelationship === 2) {
      setPpeOptionsSelect({
        id: 0,
        name: 'Selecione',
      })
      setNamePpe('')
      setDocumentPpe('')
      setDocumentNumberPpe('')
      setDocumentDigitPpe('')
    }
  }, [degreeRelationship])

  const handlePaymentStep = () => {
    if (!creditCardData) {
      dispatch(
        GetTripInsuranceCreditCardRequest({
          onSuccess: instantiate,
          Step: Steps.paymentStep,
          onErrorToast: addToast,
        })
      )
    } else {
      instantiate(Steps.paymentStep)
    }
  }

  const onSubmit = () => {
    const gender =
      form && form.passageiroPrincipal && form.passageiroPrincipal.sexo
        ? form.passageiroPrincipal.sexo
        : genderSelect && genderSelect.name === 'Masculino'
        ? 'M'
        : 'F'

    const ppe: IPoliticallyExposedPerson =
      degreeRelationship === 2 ||
      (degreeRelationship === 1 && ppeOptionsSelect.id === 7)
        ? {
            grauRelacionamento: degreeRelationship,
          }
        : {
            grauRelacionamento: 3,
            grauParentesco: Number(ppeOptionsSelect.id),
            nome: namePpe,
            numeroCpf: documentNumberPpe,
            digitoCpf: documentDigitPpe,
          }

    updateForm({
      ...form,
      passageiroPrincipal: {
        ...form.passageiroPrincipal,
        sexo: gender,
        endereco: {
          ...address,
          complemento: address.complemento ?? '',
          tipo: address.tipo || 'Rua',
        },
      },
      pessoaExposta: ppe,
    })

    if ((form.acompanhantes || []).length > 0) {
      instantiate(Steps.companionStep)
    } else {
      handlePaymentStep()
    }
  }

  const handlerDocumentPpe = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, '')
    setDocumentPpe(value)
    if (value.length === 11) {
      setDocumentNumberPpe(value.slice(0, 9))
      setDocumentDigitPpe(value.slice(-2))
    } else {
      setDocumentNumberPpe('')
      setDocumentDigitPpe('')
    }
  }

  const isPpeValid = (): boolean => {
    if (degreeRelationship) {
      if (degreeRelationship === 1) {
        return ppeOptionsSelect.id === 7
      }

      if (degreeRelationship === 3) {
        return (
          !!documentPpe &&
          !!documentNumberPpe &&
          documentNumberPpe.length === 9 &&
          !!documentDigitPpe &&
          documentDigitPpe.length === 2 &&
          cpf.isValid(`${documentNumberPpe}${documentDigitPpe}`)
        )
      }

      return true
    }

    return false
  }

  const isDisabledButton: boolean =
    !!(form.passageiroPrincipal?.sexo ?? genderSelect.id) &&
    !!form.passageiroPrincipal?.isResidePais &&
    !!address.bairro &&
    !!address.cidade &&
    !!address.uf &&
    !!address.logradouro &&
    !!address.numero &&
    !!address.numeroCep &&
    !!address.complementoCep &&
    !!form.isAceiteTermos &&
    !!form.isCienteMoto &&
    !!form.passageiroPrincipal?.contato?.nome &&
    !!form.passageiroPrincipal?.contato?.celularDDD &&
    !!form.passageiroPrincipal?.contato?.celularNumero &&
    form.passageiroPrincipal?.contato?.celularDDD.length === 2 &&
    [8, 9].includes(form.passageiroPrincipal?.contato?.celularNumero.length) &&
    isPpeValid()

  /**
   * Methods
   */

  const handlerClick = () => {
    handleGiwRedirect('portaldecliente/conquista/perfil?r=true')
    reset()
  }

  const checkForm = (key: string) => {
    setValidForm((check: IFormInformationConfirmation) => ({
      ...check,
      [key]: true,
    }))
  }

  const validationDocumentPpe = (): errorObject | boolean => {
    if (documentPpe && documentPpe.length === 11) {
      if (!cpf.isValid(documentPpe)) {
        return {
          icon: 'information',
          message: 'CPF inválido. Por favor, verifique o número',
        }
      }
    }

    return validationInputError(documentPpe, validForm.isDocumentPpe)
  }

  const validationPhone = (): errorObject | boolean => {
    if (
      form.passageiroPrincipal?.contato?.celularDDD &&
      form.passageiroPrincipal?.contato?.celularNumero &&
      validForm.isContactPhone
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

    return validationInputError(
      `${form.passageiroPrincipal?.contato?.celularDDD}${form.passageiroPrincipal?.contato?.celularNumero}`,
      validForm.isContactPhone
    )
  }

  const errorEmergencyInputs: boolean =
    !!validationPhone() ||
    !!validationInputError(
      form.passageiroPrincipal?.contato?.nome,
      validForm.isContactName
    )

  return (
    <>
      <StepBar
        title="Contratação"
        type="Seguro Viagem"
        actualStep={1}
        totalNumberOfSteps={(form.acompanhantes || []).length > 0 ? 4 : 3}
      />
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
                  checkedItem={isReside ? '1' : '0'}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setIsReside(!!+e.currentTarget.value)
                  }
                />
              </s.RadioOptionsWrapper>
              {!isReside && (
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
                  checkedItem={degreeRelationship === 2 ? '2' : '1'}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setDegreeRelationship(+e.currentTarget.value)
                  }
                />
              </s.RadioOptionsWrapper>
            </s.RadioContainerPPE>
            {[1, 3].includes(degreeRelationship) && (
              <s.DelimiterWrapper>
                <s.Select
                  label={
                    isSmUp
                      ? 'quem é a pessoa politicamente exposta?'
                      : 'quem é a PPE?'
                  }
                  options={ppeOptions}
                  selected={ppeOptionsSelect}
                  optionBoxDirection="bottom"
                />
                {degreeRelationship === 3 && (
                  <>
                    <s.PPENameInput
                      label="nome completo"
                      value={namePpe}
                      error={validationInputError(
                        namePpe,
                        validForm.isFullNamePpe
                      )}
                      onBlur={() => checkForm('isFullNamePpe')}
                      placeholder="Digite aqui"
                      onChange={(e: React.FormEvent<HTMLInputElement>) =>
                        setNamePpe(e.currentTarget.value.replace(/[0-9]/g, ''))
                      }
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
              <AddressForm addressData={[address, setAddress]} />
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
            <s.EmergencyContactWrapper error={errorEmergencyInputs}>
              <s.EmergencyContactTextInput
                label="nome"
                value={form.passageiroPrincipal?.contato?.nome || ''}
                placeholder="Digite aqui"
                error={validationInputError(
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
          <s.CardLast>
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
                <s.Icon name="pdf" color="gray6" />
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
                <s.Icon name="pdf" color="gray6" />
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
                  disabled={true}
                  onChange={() => setIsNotification(!isNotification)}
                  label="Aceito receber informações
                e novidades da Porto Seguro
                em meu e-mail."
                />
              </s.WrapperHiringTerms>
            </s.TextInputContainer>
          </s.CardLast>
        </s.Col>
      </s.ContentContainer>
      <s.FooterContainer>
        <Container>
          <Row>
            <s.Col lg={3} />
            <s.Col lg={8} md={11}>
              <s.ButtonAlign>
                <s.NextButton
                  loading={isCreditCardLoading}
                  color="secondary"
                  disabled={!isDisabledButton}
                  onClick={onSubmit}
                >
                  continuar
                </s.NextButton>
              </s.ButtonAlign>
            </s.Col>
          </Row>
        </Container>
      </s.FooterContainer>
    </>
  )
}

export default InformationConfirmation
