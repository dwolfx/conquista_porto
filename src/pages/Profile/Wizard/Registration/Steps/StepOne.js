import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import RadioInput from 'components/Inputs/Radio'
import SelectInput from 'components/Inputs/Select'
import TextInput from 'components/Inputs/Text'
import theme from 'styles/theme'

import {
  documentoOptions,
  estadoCivilOptions,
  nacionalidadeOptions,
  ppeOptions,
  sexoOptions,
} from '../mocks'
import {
  ButtonContainer,
  Row,
  Section,
  SectionTitle,
  SectionText,
  Wrapper,
} from '../../styles'

const StepOne = ({ changeScreen }) => (
  <>
    <Section backgroundColor="#fff">
      <Wrapper align="center">
        <SectionTitle>Cadastro do Investidor</SectionTitle>
      </Wrapper>
    </Section>

    <Section
      backgroundColor={theme.colors.backgroundColor}
      border="1px solid #fff"
    >
      <Wrapper>
        <Row justify="center">
          <SectionText fontSize={11} fontWeight={600} uppercase>
            Descrição
          </SectionText>
        </Row>

        <Row justify="space-between">
          <TextInput width={60} paddingRight={15} label="Nome" name="nome" />
          <TextInput width={40} paddingLeft={15} label="CPF" name="cpf" />
        </Row>
        <Row>
          <SelectInput
            label="Tipo de documento"
            width={40}
            paddingRight={15}
            name="tipoDocumento"
            options={documentoOptions}
          />
          <TextInput
            width={60}
            paddingLeft={15}
            label="Número do documento"
            name="numeroDocumento"
          />
        </Row>
        <Row>
          <TextInput
            width={33.3}
            paddingRight={15}
            label="Data de nascimento"
            name="dataNascimento"
          />
          <SelectInput
            width={33.3}
            paddingRight={15}
            paddingLeft={15}
            label="Sexo"
            name="sexo"
            options={sexoOptions}
          />
          <SelectInput
            width={33.3}
            paddingLeft={15}
            label="Nacionalidade"
            name="nacionalidade"
            options={nacionalidadeOptions}
          />
        </Row>
        <Row>
          <TextInput width={50} paddingRight={15} label="Nome da mãe" />
          <TextInput width={50} paddingLeft={15} label="Nome do pai" />
        </Row>
        <Row>
          <SelectInput
            width={33.3}
            paddingRight={15}
            label="Estado civil"
            name="estadoCivil"
            options={estadoCivilOptions}
          />
          <TextInput
            width={33.3}
            paddingRight={15}
            paddingLeft={15}
            label="Nome do cônjuge"
            disabled
          />
          <TextInput
            width={33.3}
            paddingLeft={15}
            label="CPF do cônjuge"
            disabled
          />
        </Row>
        <Row>
          <RadioInput
            title="Você é uma Pessoa Politicamente Exposta (PPE)?"
            options={ppeOptions}
          />
        </Row>
      </Wrapper>
    </Section>

    <Section>
      <ButtonContainer>
        <Button color="primary" onClick={changeScreen}>
          Continuar
        </Button>
      </ButtonContainer>
    </Section>
  </>
)

StepOne.defaultProps = {
  changeScreen: null,
}

StepOne.propTypes = {
  changeScreen: PropTypes.func,
}

export default StepOne
