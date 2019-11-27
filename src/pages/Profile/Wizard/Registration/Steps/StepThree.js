import React from 'react'
import PropTypes from 'prop-types'

import AddressInfos from 'components/AddressInfos'
import Button from 'components/Button'
import Icon from 'components/IconExporter'
import RadioInput from 'components/Inputs/Radio'
import SelectInput from 'components/Inputs/Select'
import TextInput from 'components/Inputs/Text'
import theme from 'styles/theme'
import { ButtonAdd } from 'pages/Profile/styles'

import { workingQuestionMark } from '../mocks'
import {
  ButtonContainer,
  Row,
  Section,
  SectionTitle,
  Wrapper,
} from '../../styles'

const StepThree = ({ changeScreen }) => (
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
        <Row>
          <SelectInput
            label="Profissão"
            name="profissao"
            paddingRight={30}
            width={40}
          />
          <RadioInput
            title="Você está trabalhando?"
            options={workingQuestionMark}
          />
        </Row>

        <AddressInfos />

        <Row>
          <ButtonAdd>
            <Icon name="add" fill="currentColor" width={20} />
            Adicionar telefone
          </ButtonAdd>
        </Row>

        <Row>
          <TextInput
            label="E-mail profissional"
            name="emailProfissional"
            type="email"
            width={50}
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

StepThree.defaultProps = {
  changeScreen: null,
}

StepThree.propTypes = {
  changeScreen: PropTypes.func,
}

export default StepThree
