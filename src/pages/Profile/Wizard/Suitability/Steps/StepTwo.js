import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import { ThemeContext } from 'styled-components'

import {
  Section,
  Wrapper,
  SectionTitle,
  SectionText,
  ButtonContainer,
} from '../../styles'

const StepTwo = ({ backScreen }) => {
  const themeContext = useContext(ThemeContext)
  return (
    <>
      <Section backgroundColor={themeContext.colors.white}>
        <Wrapper align="center">
          <SectionTitle>Definir perfil do investidor</SectionTitle>
        </Wrapper>
      </Section>

      <Section
        backgroundColor={themeContext.colors.gray1}
        border={`1px solid ${themeContext.colors.white}`}
      >
        <Wrapper align="center">
          <SectionText>Seu perfil é moderado</SectionText>
        </Wrapper>
      </Section>

      <Section
        backgroundColor={themeContext.colors.gray1}
        border={`1px solid ${themeContext.colors.white}`}
      >
        <Wrapper align="center">
          <SectionText
            fontSize={11}
            fontWeight={600}
            marginBottom={30}
            uppercase
          >
            Descrição
          </SectionText>
          <SectionText fontSize={14} align="center">
            Você busca aumentar seu patrimônio de forma relevante. Por isso,
            aceita riscos mais elevados. Para você, o dinheiro pode oscilar
            significativamente e ter perdas médias, desde que tenha a chance de
            ganhar acima do mercado, em médio ou em longo prazo. Uma parcela
            significativa dos investimentos não possui liquidez imediata. Com
            isso, você sabe que pode passar algum tempo (dias ou semanas) para o
            dinheiro cair em sua conta após um pedido de resgate.
          </SectionText>
        </Wrapper>
      </Section>

      <Section>
        <ButtonContainer>
          <Button color="primary">Salvar</Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button onClick={backScreen}>Refazer</Button>
        </ButtonContainer>
      </Section>
    </>
  )
}

StepTwo.defaultProps = {
  backScreen: null,
}

StepTwo.propTypes = {
  backScreen: PropTypes.func,
}

export default StepTwo
