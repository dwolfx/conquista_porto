/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Icon from 'components/IconExporter'
import RadioInput from 'components/Inputs/Radio'
import theme from 'styles/theme'

import {
  ButtonContainer,
  Section,
  SectionText,
  SectionTitle,
  Wrapper,
} from '../../styles'

const SuccessStep = ({ changeScreen }) => (
  <>
    <Section backgroundColor="#fff">
      <Wrapper align="center">
        <Icon name="awesome" width={50} fill="#777" />
        <SectionTitle fontSize={22} marginTop={50}>
          Tudo certo com seu cadastro
        </SectionTitle>
        <SectionText fontSize={14}>
          Logo, enviaremos uma mensagem de confirmação em seu e-mail.
        </SectionText>
      </Wrapper>
    </Section>

    <Section backgroundColor={theme.colors.backgroundColor}>
      <Wrapper align="center">
        <SectionText fontSize={22} padding="0 30px" marginBottom={30}>
          Para investir, você precisa preencher o perfil do investidor. Quer
          fazer isso agora?
        </SectionText>
        <RadioInput
          options={[
            { name: 'Sim', value: 'Sim' },
            { name: 'Não', value: 'Não' },
          ]}
          name="perfil-investidor"
        />
        <ButtonContainer marginTop={30}>
          <Button color="primary" onClick={changeScreen}>
            Continuar
          </Button>
        </ButtonContainer>
      </Wrapper>
    </Section>
  </>
)

SuccessStep.defaultProps = {
  changeScreen: null,
}

SuccessStep.propTypes = {
  changeScreen: PropTypes.func,
}

export default SuccessStep
