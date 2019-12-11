import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import RadioInput from 'components/Inputs/Radio'
import SelectInput from 'components/Inputs/Select'
import { ThemeContext } from 'styled-components'

import {
  crisisOptions,
  frequencyOptions,
  priorityOptions,
  volumeOptions,
  dependentsOptions,
  heritageOptions,
  monthlyIncomeOptions,
} from '../mock'
import {
  Section,
  Wrapper,
  SectionTitle,
  SectionText,
  ButtonContainer,
} from '../../styles'

const StepOne = ({ changeScreen }) => {
  const themeContext = useContext(ThemeContext)
  const RadioSection = ({ title, options, name }) => (
    <Section
      backgroundColor={themeContext.colors.gray1}
      border={`1px solid ${themeContext.colors.white}`}
    >
      <Wrapper>
        <SectionText marginBottom={35}>{title}</SectionText>
        <RadioInput
          name={name}
          options={options}
          itemsDirection="column"
          itemsAlign="flex-start"
        />
      </Wrapper>
    </Section>
  )

  RadioSection.defaultProps = {
    title: '',
    options: [],
    name: '',
  }

  RadioSection.propTypes = {
    title: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    name: PropTypes.string,
  }

  return (
    <>
      <Section backgroundColor={themeContext.colors.white}>
        <Wrapper align="center">
          <SectionTitle>Definir perfil do investidor</SectionTitle>
          <SectionText align="center" marginBottom={40}>
            Aqui, você vai descobrir qual é seu perfil de investidor. Basta
            responder o questionário de avaliação do perfil de risco, que é uma
            exigência legal, e logo vamos saber quais são os produtos mais
            adequados para te oferecer.
          </SectionText>
          <ButtonContainer>
            <Button>Mais informações</Button>
          </ButtonContainer>
        </Wrapper>
      </Section>

      <RadioSection
        name="prioridadeInvestir"
        title="Qual a sua prioridade ao investir?"
        options={priorityOptions}
      />

      <RadioSection
        name="criseDesvalorizar"
        title="O que você faria se, em uma crise, seus recursos desvalorizassem 10% em um mês?"
        options={crisisOptions}
      />

      <RadioSection
        name=""
        title="Baseado em sua formação acadêmica, experiência profissional e nos produtos nos quais você já investiu, com quais investimentos você tem familiaridade?"
        options={frequencyOptions}
      />

      <RadioSection
        name=""
        title="Qual é o seu prazo de investimento?"
        options={volumeOptions}
      />

      <RadioSection
        name=""
        title="No último ano, com qual frequência você realizou investimentos?"
        options={priorityOptions}
      />

      <RadioSection
        name=""
        title="No último ano, qual volume você aplicou no mercado financeiro?"
        options={priorityOptions}
      />

      <Section
        backgroundColor={themeContext.colors.gray1}
        border={`1px solid ${themeContext.colors.white}`}
      >
        <Wrapper>
          <SectionText marginTop={40} marginBottom={5}>
            Quantos dependentes você possui?
          </SectionText>
          <SelectInput width={40} options={dependentsOptions} />

          <SectionText marginTop={40} marginBottom={5}>
            Qual é a sua renda mensal?
          </SectionText>
          <SelectInput width={40} options={monthlyIncomeOptions} />

          <SectionText marginTop={40} marginBottom={5}>
            Qual é o valor do seu patrimônio?
          </SectionText>
          <SelectInput width={40} options={heritageOptions} />
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
}

StepOne.defaultProps = {
  changeScreen: null,
}

StepOne.propTypes = {
  changeScreen: PropTypes.func,
}

export default StepOne
