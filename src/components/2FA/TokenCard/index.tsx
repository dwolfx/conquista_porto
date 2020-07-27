import React, { useState } from 'react'

import 'styled-components/macro'
import { DefaultTheme } from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import {
  Post2FATokenDataRequest,
  SaveToken,
} from 'store/modules/2FAToken/action'
import { useToast } from 'hooks/toast'
import useMedia from 'hooks/useMedia'

import Text from 'components/Text'
import ButtonLink from 'components/Button/Link'
import SecuritySeal from 'components/SecuritySeal'

import {
  Card,
  Container,
  ContainerSecuritySeal,
  ContainerResendTokenButtons,
  Footer,
  InputStyled,
  Button,
} from '../styles'

interface IProps {
  onPrevious: () => void
  onNext: () => void
}

const TokenCard = ({ onPrevious, onNext, ...rest }: IProps) => {
  const dispatch = useDispatch()
  const isTablet = useMedia('lg')
  const { addToast } = useToast()

  const [token, setToken] = useState<string>('')
  const [type, setType] = useState<'sms_otp' | 'email_otp'>('sms_otp')

  const data = useSelector((state: any) =>
    state.token2fa.data.find((item: any) => item.name === 'sms_otp')
  )

  function hidePhoneNumber(phoneNumber: string) {
    return phoneNumber.replace(
      /(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/,
      '($1) $2**$4**$6'
    )
  }

  return (
    <Card
      {...rest}
      footer={
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
            disabled={token.length < 5}
          >
            próximo
          </Button>
        </Footer>
      }
    >
      <Container>
        <Text type="headline" color="gray6">
          Para confirmar a solicitação, insira o token enviado para:{' '}
          {hidePhoneNumber(data.value)}
        </Text>
        <InputStyled
          placeholder="Digite o código recebido"
          data-gtm-type="form"
          data-gtm-formtype="input"
          data-gtm-subname="preenchimento token"
          data-gtm-name="autenticacao do token"
          value={token}
          maxLength={5}
          onChange={({ target }) => setToken(target.value)}
          onBlur={({ target }) =>
            dispatch(
              SaveToken({
                type,
                value: target.value,
              })
            )
          }
          onKeyUp={({ keyCode }) => {
            if (keyCode === 13) {
              onNext()
            }
          }}
        />
        <ContainerResendTokenButtons>
          <Button
            outline
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="autenticacao do token"
            data-gtm-name="botao reenviar sms"
            onClick={() => {
              setType('sms_otp')
              dispatch(Post2FATokenDataRequest('sms_otp', addToast))
            }}
          >
            reenviar
          </Button>
          {isTablet ? (
            <Button
              outline
              data-gtm-type="click"
              data-gtm-clicktype="button"
              data-gtm-subname="autenticacao do token"
              data-gtm-name="botao reenviar email"
              css={`
                margin-left: ${({ theme }: { theme: DefaultTheme }) =>
                  `${theme.spacing(2)}px`};
              `}
              onClick={() => {
                dispatch(Post2FATokenDataRequest('email_otp', addToast))
              }}
            >
              enviar por e-mail
            </Button>
          ) : (
            <ButtonLink
              onClick={() => {
                dispatch(Post2FATokenDataRequest('email_otp', addToast))
              }}
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
          )}
        </ContainerResendTokenButtons>
        <ContainerSecuritySeal>
          <SecuritySeal />
        </ContainerSecuritySeal>
      </Container>
    </Card>
  )
}

export default TokenCard
