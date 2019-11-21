import React from 'react'
import AddressInfos from '../../../../../components/AddressInfos'
import Button from '../../../../../components/Button'
import Icon from '../../../../../components/IconExporter'
import RadioInput from '../../../../../components/Inputs/Radio'
import SelectInput from '../../../../../components/Inputs/Select'
import TextInput from '../../../../../components/Inputs/Text'
import { workingQuestionMark } from '../mocks'
import {
  ButtonContainer,
  Row,
  Section,
  SectionTitle,
  Wrapper,
} from '../../styles'
import { ButtonAdd } from '../../../styles'
import theme from '../../../../../styles/theme'

export default ({ changeScreen }) => (
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
