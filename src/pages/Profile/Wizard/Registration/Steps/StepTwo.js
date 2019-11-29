/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PropTypes from 'prop-types'

import AddressFields from 'components/AddressInfos'
import Button from 'components/Button'
import Icon from 'components/IconExporter'
import PhoneFields from 'components/PhoneInfos'
import RadioInput from 'components/Inputs/Radio'
import TextInput from 'components/Inputs/Text'
import theme from 'styles/theme'
import { ButtonAdd } from 'pages/Profile/styles'

import { fiscalAddressOptions, cotitularOptions } from '../mocks'
import {
  ButtonContainer,
  Row,
  Section,
  SectionText,
  SectionTitle,
  Wrapper,
} from '../../styles'

const StepTwo = ({ changeScreen }) => (
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

        <AddressFields />

        <PhoneFields index={0} />

        <Row>
          <ButtonAdd>
            <Icon name="add" fill="currentColor" width={20} />
            Adicionar telefone
          </ButtonAdd>
        </Row>

        <Row>
          <TextInput type="email" label="E-mail" name="email" width={50} />
        </Row>
        <Row>
          <RadioInput
            name="resid-fiscal-estrang"
            title="Você tem residência fiscal estrangeira?"
            options={fiscalAddressOptions}
          />
        </Row>
        <Row direction="column">
          <SectionText>
            Você quer adicionar um cotitular ao seu cadastro como investidor?
          </SectionText>
          <SectionText fontSize={12}>
            Se a resposta for "Sim", é preciso que você tenha uma conta conjunta
            com essa pessoa em seu banco.
          </SectionText>
          <RadioInput name="cotitularRadio" options={cotitularOptions} />
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

StepTwo.defaultProps = {
  changeScreen: null,
}

StepTwo.propTypes = {
  changeScreen: PropTypes.func,
}

export default StepTwo
