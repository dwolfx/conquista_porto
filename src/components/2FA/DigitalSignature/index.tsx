import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'styled-components/macro'

import Text from 'components/Text'
import SecuritySeal from 'components/SecuritySeal'
import IconExporter from 'components/IconExporter'

import { useToast } from 'hooks/toast'
import { ValidateTokenNSignature } from 'store/modules/2FAToken/action'

import {
  Card,
  Container,
  ContainerSecuritySeal,
  VirtualKeyboard,
  Key,
  Footer,
  InputStyled,
  Button,
} from '../styles'

interface IProps {
  onPrevious: () => void
  onConfirm: () => void
  onError: () => void
  isNextButtonLoading: boolean
}

const DigitalSignature = ({
  onPrevious,
  onConfirm,
  onError,
  isNextButtonLoading,
  ...rest
}: IProps) => {
  const dispatch = useDispatch()
  const { addToast } = useToast()

  const [signature, setSignature] = useState<string>('')
  const { keyboardData, tokenData } = useSelector((state: any) => ({
    keyboardData: state.virtualKeyboard,
    tokenData: state.token2fa,
  }))

  const handleVirtualKeyboardKey = (item: any) => {
    const [key] = Object.keys(item)
    return (
      <Key
        key={key}
        role="button"
        onClick={() => {
          if (signature.length < 6) {
            setSignature(prevState => `${prevState}${key}`)
          }
        }}
      >
        <Text
          type="caption"
          color="gray5"
          css={`
            user-select: none;
          `}
        >
          {item[key].replace(',', ' ou ')}
        </Text>
      </Key>
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
            data-gtm-subname="assinatura eletronica"
            data-gtm-name="botao voltar tela anterior"
          >
            voltar
          </Button>
          <Button
            color="secondary"
            disabled={
              signature.length < 6 ||
              tokenData.isLoading ||
              keyboardData.isLoading
            }
            loading={
              tokenData.isLoading ||
              keyboardData.isLoading ||
              isNextButtonLoading
            }
            loadingColor="white"
            onClick={() => {
              /**
               * - clicou:
               *   - valida token
               *   - valida assinatura
               *   - ok?
               *     - onConfirm (request POST de retirar/assinatura)
               *   - não ok?
               *     - incrementa state de error
               *     - previousStep (volta pra tela do token)
               * - state de error === 5
               *   - onError
               * */
              dispatch(
                ValidateTokenNSignature({
                  signature,
                  onError,
                  onSuccess: onConfirm,
                  addToast,
                  goToPreviousStep: onPrevious,
                })
              )
            }}
            data-gtm-type="click"
            data-gtm-clicktype="button"
            data-gtm-subname="assinatura eletronica"
            data-gtm-name="botao confirmacao"
          >
            confirmar
          </Button>
        </Footer>
      }
    >
      <Container>
        <Text type="headline" color="gray6">
          Agora, insira sua assinatura eletrônica através do teclado virtual
          abaixo:
        </Text>
        <InputStyled
          readOnly
          value={signature}
          type="password"
          placeholder="Assinatura eletrônica"
          data-gtm-type="form"
          data-gtm-formtype="input"
          data-gtm-subname="preenchimento assinatura eletronica"
          data-gtm-name="autenticacao assinature eletronica"
        />
        <VirtualKeyboard>
          {keyboardData?.data?.map(handleVirtualKeyboardKey)}
          <Key
            role="button"
            onClick={() => {
              if (signature.length > 0) {
                setSignature(prevState =>
                  prevState.substring(0, prevState.length - 1)
                )
              }
            }}
          >
            <IconExporter name="backspace" />
          </Key>
        </VirtualKeyboard>
        <ContainerSecuritySeal>
          <SecuritySeal />
        </ContainerSecuritySeal>
      </Container>
    </Card>
  )
}

export default DigitalSignature
