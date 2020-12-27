import { StepComponent } from 'hooks/FluxManagement/types'
import StepBar from 'pages/TripInsurance/commons/StepBar'
import React from 'react'
import { uuid } from 'uuidv4'
import useMedia from 'hooks/useMedia'

import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'

import Divisor from 'components/Divisor'

import * as t from 'components/Inputs/Select/types'

import { formatCpf, formatPhoneNumber } from 'helpers'
import * as s from './styles'

import AddressForm from './AddressForm'

const genders: t.TOptions[] = [
  {
    id: 1,
    text: 'Masculino',
  },
  {
    id: 2,
    text: 'Feminino',
  },
]

const ppeOptions: t.TOptions[] = [
  {
    id: 1,
    text: 'Eu',
  },
  {
    id: 2,
    text: 'Mãe',
  },
  {
    id: 3,
    text: 'Irmão',
  },
  {
    id: 4,
    text: 'Pai',
  },
  {
    id: 5,
    text: 'Tio',
  },
  {
    id: 6,
    text: 'Tia',
  },
  {
    id: 7,
    text: 'Avo',
  },
  {
    id: 8,
    text: 'Avo',
  },
]

const selected: t.TSelected = {
  id: 0,
}

const InformationConfirmation: StepComponent = () => {
  const isSmUp = useMedia('smUp')
  const isLgUp = useMedia('lgUp')

  return (
    <>
      <StepBar actualStep={1} totalNumberOfSteps={4} />
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
              <ButtonLink>
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
            <s.DataDisplay label="Nome" value="Bruno Mizrahi" />
            <Divisor />
            <s.DataDisplay label="CPF" value="421.980.660-20" />
            <Divisor />
            <s.DataDisplay label="Data de nascimento" value="14/02/1987" />
            <Divisor />
            <s.DelimiterWrapper>
              <s.Select label="sexo" options={genders} selected={selected} />
            </s.DelimiterWrapper>
            <Divisor />
            <s.RadioContainer>
              <Text type="headline" bold>
                Você reside no Brasil?
              </Text>
              <s.RadioOptionsWrapper data-testid="radio-brazilian-resident">
                <s.Radio
                  id={uuid()}
                  name="Yes"
                  label="Sim"
                  value={1}
                  checked={false}
                  handleChange={() => null}
                  disabled
                />
                <s.Radio
                  id={uuid()}
                  name="No"
                  label="Não"
                  value={0}
                  checked
                  handleChange={() => null}
                />
              </s.RadioOptionsWrapper>
              <s.WarningFlag title="Este seguro só poderá ser contratado pelo segurado residente no Brasil." />
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
              <ButtonLink>
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
                <s.Radio
                  id={uuid()}
                  name="Yes"
                  label="Sim"
                  value={1}
                  checked={false}
                  handleChange={() => null}
                  disabled
                />
                <s.Radio
                  id={uuid()}
                  name="No"
                  label="Não"
                  value={0}
                  checked
                  handleChange={() => null}
                />
              </s.RadioOptionsWrapper>
            </s.RadioContainerPPE>
            <s.DelimiterWrapper>
              <s.Select
                label={
                  isSmUp
                    ? 'quem é a pessoa políticamente exposta?'
                    : 'quem é a PPE?'
                }
                options={ppeOptions}
                selected={selected}
                optionBoxDirection="bottom"
              />
              <s.PPENameInput label="nome completo" value="Maria Eduarda" />
              <s.TextInput
                label="cpf"
                value={formatCpf('00000000000')}
                onChange={() => null}
              />
            </s.DelimiterWrapper>
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
              <s.EmergencyContactTextInput label="nome" value="Maria" />
              <s.TextInput
                label="telefone"
                value={formatPhoneNumber(11, 964585965)}
              />
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
                <ButtonLink noIcon>
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
                <ButtonLink noIcon>
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
                  checked
                  label="Declaro que li e aceito as Condições Gerais deste seguro."
                />
                <s.Checkbox
                  id={uuid()}
                  checked
                  label="Estou ciente de que não
                há cobertura para eventos
                decorrentes de viagens
                de motocicleta na América
                Latina."
                />
                <s.Checkbox
                  id={uuid()}
                  checked
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
        <s.NextButton color="secondary">próximo</s.NextButton>
      </s.FooterContainer>
    </>
  )
}

export default InformationConfirmation
