import React from 'react'

import 'styled-components/macro'
import { DefaultTheme } from 'styled-components/macro'

import Text from 'components/Text'
import Button from 'components/Button'
import ButtonLink from 'components/Button/Link'
import SecuritySeal from 'components/SecuritySeal'

import {
  Card,
  Container,
  ContainerSecuritySeal,
  ContainerResendTokenButtons,
  Footer,
  InputStyled,
} from '../styles'

interface IProps {
  onPrevious: () => void
  onNext: () => void
}

const TokenCard = ({ onPrevious, onNext, ...rest }: IProps) => {
  return (
    <Card {...rest}>
      <Container>
        <Text type="headline" color="gray6">
          Para confirmar a solicitação, insira o token enviado para: (11)
          9**57**64
        </Text>
        <InputStyled
          placeholder="Digite o código recebido"
          data-gtm-type="form"
          data-gtm-formtype="input"
          data-gtm-subname="preenchimento token"
          data-gtm-name="autenticacao do token"
        />
        <ContainerResendTokenButtons>
          <Button
            outline
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="autenticacao do token"
            data-gtm-name="botao reenviar sms"
          >
            reenviar
          </Button>
          <ButtonLink
            onClick={() => {}}
            noIcon
            css={`
              margin-left: ${({ theme }: { theme: DefaultTheme }) =>
                `${theme.spacing(3)}px`};
            `}
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="autenticacao do token"
            data-gtm-name="botao reenviar email"
          >
            enviar por e-mail
          </ButtonLink>
        </ContainerResendTokenButtons>
        <ContainerSecuritySeal>
          <SecuritySeal />
        </ContainerSecuritySeal>
      </Container>
      <Footer>
        <Button
          outline
          onClick={onPrevious}
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname="autenticacao do token"
          data-gtm-name="botao voltar tela anterior"
        >
          voltar
        </Button>
        <Button
          color="secondary"
          onClick={onNext}
          data-gtm-type="click"
          data-gtm-clicktype="button"
          data-gtm-subname="autenticacao do token"
          data-gtm-name="botao proxima tela"
        >
          próximo
        </Button>
      </Footer>
    </Card>
  )
}

export default TokenCard
